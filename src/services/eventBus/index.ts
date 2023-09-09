import { Context } from '~/shared/kernel';
import EventBus from './EventBus';

const createEventBus = (context: Context) => {
  return new EventBus(context, window);
};

export default createEventBus;
