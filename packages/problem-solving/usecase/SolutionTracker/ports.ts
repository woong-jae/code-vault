import Solution from '~/domain/Solution';

export interface SolutionArchive {
  save(solution: Solution): Promise<boolean>;
}
