import { onCrossContextConfirm } from '~/base/infra/chrome-extension';
import createEventBus from '~/base/infra/event-bus';
import { runApp } from './runApp';

createEventBus('isolated');

onCrossContextConfirm('isolated', (message) => {
  const isConfirm = confirm(message);
  return isConfirm;
});

runApp();
