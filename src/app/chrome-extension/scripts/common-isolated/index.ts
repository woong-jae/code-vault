import { onAlert, onCrossContextConfirm } from '~/base/infra/chrome-extension';
import createEventBus from '~/base/infra/event-bus';

createEventBus('isolated');

onCrossContextConfirm('isolated', (message) => {
  const isConfirm = confirm(message);
  return isConfirm;
});

onAlert((message) => {
  alert(message);
});
