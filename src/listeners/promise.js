import { trigger } from '../event-emitter';
import { promiseCatch } from '../event-emitter/constants';

(function () {
    if (!Promise) {
        return;
    }

    class MyPromise extends Promise {
        catch(callback) {
            return super.catch(function (error) {
                let customEvent = {
                    ...error,
                    message: error && error.message,
                    stack: error && error.stack,
                    isError: true
                };

                trigger(customEvent, promiseCatch);
                callback(error);
            });
        }
    }

    Promise = MyPromise;
})();

