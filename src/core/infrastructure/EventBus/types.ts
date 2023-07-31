export type EventContext = {
  type: string;
  payload: string;
};
export type EventListener = (eventContext: EventContext) => void;
