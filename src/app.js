import './listeners/index.js';
import { subscribe as subscribeEvent, unsubscribe as unsubscribeEvent, trigger as triggerEvent } from './event-emitter';
import * as eventConstants from './event-emitter/constants';

export const subscribe = subscribeEvent;
export const unsubscribe = unsubscribeEvent;
export const trigger = triggerEvent;
export const constants = eventConstants;