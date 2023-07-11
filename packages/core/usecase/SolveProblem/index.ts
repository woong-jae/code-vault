import Repository from '~/adapter/Repository';
import Solution from '~/entity/Solution';

export default class SolveProblem {
  private solution: null | Solution = null;
  private solutionRepository: Repository<
    { platform: string; id: string },
    Solution
  >;

  constructor(
    solutionRepository: Repository<{ platform: string; id: string }, Solution>,
  ) {
    this.solutionRepository = solutionRepository;
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
    return this.solution;
  }

  async submitSolution() {
    if (!this.solution) return;
    await this.solutionRepository.setItem(
      {
        platform: this.solution.platform,
        id: this.solution.id,
      },
      this.solution,
    );
  }
}
