import { Event, EventListener, Context } from './types';

export default class EventHub {
  private listeners: EventListener[] = [];

  constructor(
    private readonly currentContext: Context,
    private readonly window?: Window,
  ) {
    if (currentContext !== 'world') {
      chrome.runtime.onMessage.addListener((event: Event) => {
        if (event.from === currentContext) return;
        this.notify(event);
      });
    }

    if (currentContext !== 'background') {
      this.window?.addEventListener('message', event => {
        const { data }: { data: Event } = event;
        if (data.from === currentContext) return;
        this.notify(data);
      });
    }
  }

  listen(listener: EventListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  emit(event: Omit<Event, 'from'>) {
    switch (this.currentContext) {
      case 'background':
        this.emitFromBackground({
          from: 'background',
          ...event,
        });
        break;
      case 'isolated':
        this.emitFromIsolated({
          from: 'isolated',
          ...event,
        });
        break;
      case 'world':
        this.emitFromWorld({
          from: 'world',
          ...event,
        });
        break;
    }
  }

  private notify(event: Event) {
    this.listeners.forEach(listener => listener(event));
  }

  private emitFromIsolated(event: Event) {
    chrome.runtime.sendMessage(event);
    this.window?.postMessage(event);
  }

  private emitFromWorld(event: Event) {
    this.window?.postMessage(event, '*');
  }

  private emitFromBackground(event: Event) {
    this.getCurrentTab().then(tab => {
      if (!tab.id) return;
      chrome.tabs.sendMessage(tab.id, event);
    });
  }

  private async getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
}
