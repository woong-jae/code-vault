import SolutionInterceptor from '~/adapter/SolutionInterceptor';
import Solution from '~/entity/Solution';

export default class SolveProblem {
  private solution: null | Solution = null;

  constructor(solutionInterceptor: SolutionInterceptor) {
    solutionInterceptor.onSubmit(data => {
      this.solution = new Solution(data);
    });
  }

  getSolution() {
    return this.solution;
  }
}
