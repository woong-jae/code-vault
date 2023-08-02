import SolutionTracker from '~/core/application/SolutionTracker';
import createEventHub from '../common/createEventHub';
import { SolutionInterceptor } from '~/core/application/SolutionTracker/ports';
import { SolutionInterceptListener } from '~/core/application/SolutionTracker/types';

const eventHub = createEventHub('background');

const solutionInterceptorAdaptor: SolutionInterceptor = {
  onIntercept: (() => {
    let _callback: SolutionInterceptListener;

    eventHub.listen(({ type, payload }) => {
      if (type !== 'solution') return;
      if (!payload) return;

      _callback(JSON.parse(payload));
    });

    return (callback: SolutionInterceptListener) => {
      _callback = callback;
    };
  })(),
};

const solutionTracker = new SolutionTracker(solutionInterceptorAdaptor);
solutionTracker.onSolve(solution => {
  console.log(
    '🚀 ~ file: index.ts:27 ~ solutionTracker.onSolve ~ solution:',
    solution,
  );
});
