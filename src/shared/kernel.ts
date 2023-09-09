// EventBus:
export type Context = 'world' | 'isolated' | 'background';
export type EmittedEvent = {
  from: Context;
  type: string;
  payload?: string;
};
export type EventBusListener = (event: Omit<EmittedEvent, 'from'>) => void;

export interface EventBus {
  listen(listener: EventBusListener): void;
  emit(event: Omit<EmittedEvent, 'from'>): void;
}

// Persistence:
type PersistenceKey = string;
export type Persist = <T>(key: PersistenceKey, value: T) => void;
export type Retrieve = <T>(key: PersistenceKey) => T | null;
