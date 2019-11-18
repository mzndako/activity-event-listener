import * as constants from './constants.js';

const subscribers = {};
const defaultEvent = {};
let subscriberCount = 0;

Object.values(constants).forEach(value => {
    defaultEvent[value] = true;
});

const emitEvents = (event, eventType) => {
    Object.values(subscribers).forEach(({ callback, options }) => {
        if (options[eventType] && !ignoreUrl(event, options)) {
            callback(event);
        }
    });
};

const ignoreUrl = (event, options) => {
    if (!options.ignoreUrl || !event.url) {
        return false;
    }

    const reg = new RegExp(options.ignoreUrl);

    return !!event.url.match(reg);
};

export const trigger = (event, eventType) => {
    event.type = eventType;
    event.host = { url: typeof window !== 'undefined' && window.location && window.location.href };
    event.isError = !!event.isError;
    event.date = new Date();

    emitEvents(event, eventType);
};

export const subscribe = (callback, options = {}) => {
    const mainOptions = { ...defaultEvent };

    Object.keys(options).forEach(key => {
        mainOptions[key] = options[key];
    });

    subscribers[++subscriberCount] = {
        callback,
        options: mainOptions
    };
    return subscriberCount;
};

export const unsubscribe = (subscriberId) => {
    delete subscribers[subscriberId];
};
