// EventBus:
export type Context = 'world' | 'isolated' | 'background';
export type EmittedEvent = {
  from: Context;
  type: EventKey;
  payload?: string;
};
export type EventBusListener = (event: Omit<EmittedEvent, 'from'>) => void;
export type EventBusUnsubscribe = () => void;

export type EventKey =
  | 'CROSS_CONTEXT_CONFIRM_REQUEST'
  | 'CROSS_CONTEXT_CONFIRM_RESPONSE'
  | 'SOLUTION_INTERCEPTED'
  | 'ALERT';
export interface EventBus {
  listen(listener: EventBusListener): EventBusUnsubscribe;
  emit(event: Omit<EmittedEvent, 'from'>): void;
}

// Persistence:
type PersistenceKey = string;
export type Persist = <T>(key: PersistenceKey, value: T) => Promise<void>;
export type Retrieve = <T>(key: PersistenceKey) => Promise<T | null>;
