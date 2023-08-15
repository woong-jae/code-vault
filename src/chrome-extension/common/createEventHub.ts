import EventHub from '~/services/EventHub';
import { Context } from '~/services/EventHub/types';

export default function createEventHub(context: Context, window?: Window) {
  return new EventHub(context, window);
}
