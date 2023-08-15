import { Event, EventListener, Context } from './types';

/**
 * Chrome background와 탭간 통신을 위한 이벤트 허브
 */
export default class EventHub {
  private listeners: EventListener[] = [];

  constructor(
    private readonly currentContext: Context,
    private readonly window?: Window,
  ) {
    if (currentContext !== 'world') {
      chrome.runtime.onMessage.addListener((event: Event) => {
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
        const { data }: { data: Event } = event;
        if (data.from === currentContext) return;
        if (currentContext === 'isolated') {
          this.pipeFromIsolated(data);
          return;
        }
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

  private pipeFromIsolated(event: Event) {
    if (event.from === 'world') {
      chrome.runtime.sendMessage({ ...event, from: 'isolated' });
    }
    if (event.from === 'background') {
      this.window?.postMessage({ ...event, from: 'isolated' });
    }
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
