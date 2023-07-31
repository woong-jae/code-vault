// const eventEmitter = {
//   fromIsolated: (eventContext: EventContext) => {
//     chrome.runtime.sendMessage(eventContext);
//     window.postMessage(eventContext);
//   },
//   fromWorld: (eventContext: EventContext) => {
//     window.postMessage(eventContext, '*');
//   },
//   fromBackground: (tabId: number, eventContext: EventContext) => {
//     chrome.tabs.sendMessage(tabId, eventContext);
//   },
// };

import { EventContext, EventListener } from './types';

export default class EventHub {
  private listeners: EventListener[] = [];

  constructor() {
    // if (window?.chrome) {
    //   chrome.runtime.onMessage.addListener((message: string) => {
    //     handleEvent(message);
    //   });
    // }
    // window.addEventListener('message', event => {
    //   handleEvent(event.data);
    // });
  }

  listen(listener: EventListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  emitFromIsolated(eventContext: EventContext) {
    chrome.runtime.sendMessage(eventContext);
    window.postMessage(eventContext);
    this.listeners.forEach(listener => listener(eventContext));
  }

  emitFromWorld(eventContext: EventContext) {
    window.postMessage(eventContext, '*');
    this.listeners.forEach(listener => listener(eventContext));
  }

  emitFromBackground(eventContext: EventContext) {
    this.getCurrentTab().then(tab => {
      if (!tab.id) return;
      chrome.tabs.sendMessage(tab.id, eventContext);
    });
  }

  private async getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
}
