import Solution from '~/domain/Solution';
import SolutionArchive from './interface/SolutionArchive';

export default class SolutionTrackingService {
  private solution: Solution | undefined;
  private solutionArchive: SolutionArchive;

  constructor(solutionArchive: SolutionArchive) {
    this.solutionArchive = solutionArchive;
  }

  getSolution() {
    if (!this.solution) return;
    return this.solution;
  }

  setSolution(params: {
    problemId: string;
    platform: string;
    code: string;
    language: string;
  }) {
    this.solution = new Solution({ ...params, date: new Date() });
  }

  changeCode(code: string) {
    if (!this.solution) {
      throw new Error('Solution undefined');
    }
    this.solution.code = code;
  }

  submitSolution() {
    if (!this.solution) {
      throw new Error('Solution undefined');
    }
    this.solutionArchive.save(this.solution.key, this.solution.code);
  }
}
