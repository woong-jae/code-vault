import Archive from '~/adapter/Archive';
import Solution from '~/entity/Solution';

export default class ProblemSolver {
  private solution: null | Solution = null;
  private solutionArchive: Archive<Solution>;

  constructor(solutionArchive: Archive<Solution>) {
    this.solutionArchive = solutionArchive;
  }

  setSolution(params: {
    id: string;
    language: string;
    code: string;
    platform: string;
  }) {
    this.solution = new Solution({ ...params, date: new Date() });
  }

  getSolution() {
    if (!this.solution) return null;
    return {
      ...this.solution,
    };
  }

  async submitSolution() {
    if (!this.solution) return;
    await this.solutionArchive.save(this.solution.key, this.solution);
  }
}
