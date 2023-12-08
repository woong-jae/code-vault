import { onAlert, onCrossContextConfirm } from '~/shared/infras/chrome-extension';
import createEventBus from '~/shared/infras/event-bus';

createEventBus('isolated');

onCrossContextConfirm('isolated', message => {
  const isConfirm = confirm(message);
  return isConfirm;
});

onAlert(message => {
  alert(message);
});
