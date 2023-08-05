import SolutionTracker from '~/core/application/SolutionTracker';
import createEventHub from '../common/createEventHub';
import EventHubAdaptor from '~/core/adaptor/SolutionInterceptor/EventHubAdaptor';

const eventHub = createEventHub('background');

const solutionTracker = new SolutionTracker(new EventHubAdaptor(eventHub));
solutionTracker.onSolve(solution => {
  console.log(
    '🚀 ~ file: index.ts:27 ~ solutionTracker.onSolve ~ solution:',
    solution,
  );

  eventHub.emit({
    type: 'needSetting',
  });
});
