/* EventBus */
type Context = 'world' | 'isolated' | 'background';
type EmittedEvent = {
  from: Context;
  type: EventKey;
  payload?: string;
};
type EventBusListener = (event: Omit<EmittedEvent, 'from'>) => void;
type EventBusUnsubscribe = () => void;

type EventKey =
  | 'CROSS_CONTEXT_CONFIRM_REQUEST'
  | 'CROSS_CONTEXT_CONFIRM_RESPONSE'
  | 'SOLUTION_INTERCEPTED'
  | 'ALERT';
interface EventBus {
  listen(listener: EventBusListener): EventBusUnsubscribe;
  emit(event: Omit<EmittedEvent, 'from'>): void;
}

/* Persistence */
type PersistenceKey = string;
type Persist = <T>(key: PersistenceKey, value: T) => Promise<void>;
type Retrieve = <T>(key: PersistenceKey) => Promise<T | null>;

/* Github */
type AccessToken = Brand<string, 'accessToken'>;

/* Utility Type */
type Brand<T, K extends string> = T & {
  _brand: K;
};

/* Request */
type RequestFail = {
  reason: string;
};
type RequestSuccess<T> = {
  data: T;
};
type RequestResult<T> = RequestSuccess<T> | RequestFail;
