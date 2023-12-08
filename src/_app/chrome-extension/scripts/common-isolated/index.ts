import createEventBus from '~/_shared/infrastructure/eventBus';
import {
  onAlert,
  onCrossContextConfirm,
} from '~/_shared/infrastructure/chrome-extension';

createEventBus('isolated');

onCrossContextConfirm('isolated', message => {
  const isConfirm = confirm(message);
  return isConfirm;
});

onAlert(message => {
  alert(message);
});
