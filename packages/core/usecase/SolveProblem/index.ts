import Repository from '~/adapter/Repository';
import Solution from '~/entity/Solution';

export default class SolveProblem {
  private repository: Repository<Solution>;
  constructor(repository: Repository<Solution>) {
    this.repository = repository;
  }
}
