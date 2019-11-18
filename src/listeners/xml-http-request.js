import { trigger } from '../event-emitter';
import { httpSuccess, httpFailure } from '../event-emitter/constants';

(function () {
    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }
    /**
   * Override XMLHttpRequest so we have monitor and retrieve all request made to any endpoint
   */
    class MyXMLHttpRequest extends XMLHttpRequest {
        constructor() {
            super();
            this.successString = 'success';
            this.failureString = 'failure';
        }

        open(...args) {
            this._method = args[0];
            this._url = args[1];
            super.open(...args);
        }

        send(...args) {
            this._data = args[0];
            super.send(...args);
        }

        set onload(funct) {
            super.onload = (...args) => {
                this.fireTrigger(this.successString);
                funct(...args);
            };
        }

        set onerror(funct) {
            super.onerror = (...args) => {
                this.fireTrigger(this.failureString);
                funct(...args);
            };
        }

        fireTrigger(type) {
            const event = {
                method: this._method,
                url: this._url,
                data: this._data,
                responseHeader: this.getAllResponseHeaders(),
                status: this.status
            };

            let eventType = httpSuccess;

            switch (type) {
            case this.failureString:
                event.isError = true;
                event.failure = 'Error accessing page';
                eventType = httpFailure;

                break;
            case this.successString:
                event.response = this.responseText.substring(0, 1000);
            }

            trigger(event, eventType);
        }

    }

    XMLHttpRequest = MyXMLHttpRequest;
})();

