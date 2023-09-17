import createEventBus from '~/shared/infrastructure/eventBus';
import {
  onAlert,
  onCrossContextConfirm,
} from '~/shared/infrastructure/chrome-extension';

createEventBus('isolated');

onCrossContextConfirm('isolated', message => {
  const isConfirm = confirm(message);
  return isConfirm;
});

onAlert(message => {
  alert(message);
});
