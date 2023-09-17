import {
  type Context,
  type EmittedEvent,
  type EventBus,
  type EventBusListener,
} from '~/shared/kernel';

/**
 * Chrome background와 탭간 통신을 위한 이벤트 허브
 */
export default class EventBusService implements EventBus {
  private static _eventBusInstance: EventBusService;

  private listeners: EventBusListener[] = [];

  constructor(
    private readonly currentContext: Context,
    private readonly window?: Window,
  ) {
    if (EventBusService._eventBusInstance)
      return EventBusService._eventBusInstance;

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

    EventBusService._eventBusInstance = this;
  }

  listen(listener: EventBusListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  emit(event: Omit<EmittedEvent, 'from'>) {
    this.notify({
      type: event.type,
      payload: event.payload,
    });

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

  private notify(event: Omit<EmittedEvent, 'from'>) {
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
      if (!tab?.id) return;

      chrome.tabs.sendMessage(tab.id, event).catch(() => {
        console.log('EventBus: emitFromBackground failed...');
      });
    });
  }

  private async getCurrentTab() {
    const [tab] = await chrome.tabs.query({
      lastFocusedWindow: true,
      active: true,
    });
    return tab;
  }
}
