import EventHub from '~/core/infrastructure/EventHub';
import { Context } from '~/core/infrastructure/EventHub/types';

export default function createEventHub(context: Context, window?: Window) {
  return new EventHub(context, window);
}
