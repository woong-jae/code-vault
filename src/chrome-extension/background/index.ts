import SolutionTracker from '~/features/solutionTracker/core/SolutionTracker';
import createEventHub from '../common/createEventHub';
import EventHubAdaptor from '~/features/solutionTracker/adaptor/SolutionInterceptor/EventHubAdaptor';
import Url from '~/common/const/Url';
import EventTypes from '~/services/EventHub/EventTypes';

const eventHub = createEventHub('background');

const solutionTracker = new SolutionTracker(new EventHubAdaptor(eventHub));
solutionTracker.onSolve(solution => {
  console.log(
    '🚀 ~ file: index.ts:27 ~ solutionTracker.onSolve ~ solution:',
    solution,
  );

  eventHub.emit({
    type: EventTypes.CONFIRM_REQUEST,
  });
});

/* Chrome extension 아이콘 클릭시 세팅 페이지 탭 열기 */
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: Url.SETTING_PAGE,
  });
});
