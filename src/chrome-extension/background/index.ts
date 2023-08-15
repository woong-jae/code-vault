import SolutionTracker from '~/features/solutionTracker/core/SolutionTracker';
import createEventHub from '../common/createEventHub';
import EventHubAdaptor from '~/features/solutionTracker/adaptor/SolutionInterceptor/EventHubAdaptor';

const eventHub = createEventHub('background');

const solutionTracker = new SolutionTracker(new EventHubAdaptor(eventHub));
solutionTracker.onSolve(solution => {
  console.log(
    '🚀 ~ file: index.ts:27 ~ solutionTracker.onSolve ~ solution:',
    solution,
  );

  eventHub.emit({
    type: 'solved',
  });
});

chrome.action.onClicked.addListener(() => console.log('clicked'));