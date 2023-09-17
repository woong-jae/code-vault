import { type Context } from '~/shared/kernel';
import EventBus from './EventBus';

const createEventBus = (context: Context) => {
  return new EventBus(context, context !== 'background' ? window : undefined);
};

export default createEventBus;