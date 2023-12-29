import EventBusService from './event-bus';

const createEventBus = (context: Context) => {
  return new EventBusService(
    context,
    context !== 'background' ? window : undefined,
  );
};

export default createEventBus;
