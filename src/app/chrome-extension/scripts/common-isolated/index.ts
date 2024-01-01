import createEventBus from '~/base/infra/event-bus';
import { runApp } from './runApp';

createEventBus('isolated');

runApp();
