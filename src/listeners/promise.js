import { trigger } from '../event-emitter';
import { promiseCatch } from '../event-emitter/constants';

(function () {
    if (typeof Promise === 'undefined') {
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

                trigger(customEvents, promiseCatch);
                callback(error);
            });
        }
    }

    Promise = MyPromise;
})();

console.log("confirming it gets here");

const sum = (x, y) => {
         return x + y;
}

