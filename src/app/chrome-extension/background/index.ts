import createSolutionTracker from '~/features/solution/core/createSolutionTracker';
import saveSolution from '~/features/solution/core/saveSolution';
import createEventBus from '~/services/eventBus';
import EventTypes from '~/services/eventBus/EventTypes';
import Url from '~/shared/const/Url';

const eventBus = createEventBus('background');

const solutionTracker = createSolutionTracker();
solutionTracker.onSolve(() => {
  eventBus.emit({
    type: EventTypes.CONFIRM_REQUEST,
  });
});

eventBus.listen(async ({ type }) => {
  if (type === EventTypes.CONFIRM_RESPONSE) {
    if (!solutionTracker.solution) return;

    const isSuccess = await saveSolution(solutionTracker.solution);
    eventBus.emit({
      type: EventTypes.SAVED_SOLUTION,
      payload: JSON.stringify(isSuccess),
    });
  }
});

/* Chrome extension 아이콘 클릭시 세팅 페이지 탭 열기 */
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: Url.SETTING_PAGE,
  });
});
