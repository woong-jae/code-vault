export type Context = 'world' | 'isolated' | 'background';
export type Event = {
  from: Context;
  type: string;
  payload?: string;
};
export type EventListener = (event: Omit<Event, 'from'>) => void;
