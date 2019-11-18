import { unhandleRejection } from '../event-emitter/constants';
import { trigger } from '../event-emitter';

const unhandleRejectionCallback = (event) => {
    let customEvent = {
        message: event.reason && event.reason.message,
        stack: event.reason && event.reason.stack,
        isError: true
    };

    trigger(customEvent, unhandleRejection);
};

const unhandledRejectionListener = () => {
    if (('addEventListener' in window)) {
        window.addEventListener('unhandledrejection', unhandleRejectionCallback);
    } else if (('on' in process)) {
        process.on('uncaughtException', unhandleRejectionCallback);
    }
};

unhandledRejectionListener();