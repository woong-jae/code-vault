import {
  type Context,
  type EmittedEvent,
  type EventBusListener,
} from '~/shared/kernel';

/**
 * Chrome background와 탭간 통신을 위한 이벤트 허브
 */
export default class EventBus {
  private static _eventBusInstance: EventBus;

  private listeners: EventBusListener[] = [];

  constructor(
    private readonly currentContext: Context,
    private readonly window?: Window,
  ) {
    if (EventBus._eventBusInstance) return EventBus._eventBusInstance;

    if (currentContext !== 'world') {
      chrome.runtime.onMessage.addListener((event: EmittedEvent) => {
        if (event.from === currentContext) return;
        if (currentContext === 'isolated') {
          this.pipeFromIsolated(event);
          return;
        }
        this.notify(event);
      });
    }

    if (currentContext !== 'background') {
      this.window?.addEventListener('message', event => {
        const { data }: { data: EmittedEvent } = event;
        if (data.from === currentContext) return;
        if (currentContext === 'isolated') {
          this.pipeFromIsolated(data);
          return;
        }
        this.notify(data);
      });
    }

    EventBus._eventBusInstance = this;
  }

  listen(listener: EventBusListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  emit(event: Omit<EmittedEvent, 'from'>) {
    switch (this.currentContext) {
      case 'background':
        this.emitFromBackground({
          from: 'background',
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

  private notify(event: EmittedEvent) {
    this.listeners.forEach(listener => listener(event));
  }

  private pipeFromIsolated(event: EmittedEvent) {
    if (event.from === 'world') {
      chrome.runtime.sendMessage({ ...event, from: 'isolated' });
    }
    if (event.from === 'background') {
      this.window?.postMessage({ ...event, from: 'isolated' });
    }
  }

  private emitFromWorld(event: EmittedEvent) {
    this.window?.postMessage(event, '*');
  }

  private emitFromBackground(event: EmittedEvent) {
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
