import Solution from '~/domain/Solution';
import { SolveListener } from './types';
import { SolutionArchive, SolutionInterceptor } from './ports';

export default class SolutionTracker {
  private solveListeners: SolveListener[] = [];

  constructor(
    private solutionArchive: SolutionArchive,
    private solutionInterceptor: SolutionInterceptor,
  ) {
    this.solutionInterceptor.onIntercept(interceptedData => {
      this.solveListeners.forEach(listener => listener(interceptedData));
    });
  }

  onSolve(callback: SolveListener) {
    this.solveListeners.push(callback);
    return () => {
      this.solveListeners = this.solveListeners.filter(
        listener => listener !== callback,
      );
    };
  }

  async saveSolution(solution: Solution) {
    const isSuccessful = await this.solutionArchive.save(solution);
    return isSuccessful;
  }
}
