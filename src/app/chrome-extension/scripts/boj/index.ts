import { initBojSolutionEventEmitterFromWorld } from '~/features/solution/core/createSolutionEventEmitter';
import {
  onAlert,
  onCrossContextConfirm,
} from '~/shared/infrastructure/chrome-extension';

console.log('CodeVault loaded...');

initBojSolutionEventEmitterFromWorld();

onCrossContextConfirm('world', message => {
  const isConfirm = confirm(message);
  return isConfirm;
});

onAlert(message => {
  alert(message);
});
