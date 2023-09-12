import createSolutionEventEmitter from '~/features/solution/core/createSolutionEventEmitter';
import createEventBus from '~/services/eventBus';
import EventTypes from '~/services/eventBus/EventTypes';

console.log('CodeVault loaded...');

createSolutionEventEmitter('programmers');

const eventBus = createEventBus('world');
eventBus.listen(({ type, payload }) => {
  if (type === EventTypes.CONFIRM_REQUEST) {
    const isConfirm = confirm(
      '[Code-Vault]\n정답입니다!🎉 풀이를 저장하겠습니까?',
    );
    if (!isConfirm) return;

    eventBus.emit({
      type: EventTypes.CONFIRM_RESPONSE,
    });
  }

  if (type === EventTypes.SAVED_SOLUTION) {
    const isSuccess = payload ? JSON.parse(payload) : false;
    alert(isSuccess ? '성공적으로 저장했습니다' : '저장에 실패했습니다');
  }
});
