import SolutionInterceptor from '~/adapter/SolutionInterceptor';
import SolveProblem from '.';

const solutionInterceptor: SolutionInterceptor = (() => {
  const callbacks = [];
  return {
    onSubmit(callback) {
      callbacks.push(callback);
    },
  };
})();
const solveProblem = new SolveProblem(solutionInterceptor);

test('초기값', () => {
  expect(solveProblem.getSolution()).toBe(null);
});
