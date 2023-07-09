import Solution from '~/entity/Solution';

export default interface SolutionInterceptor {
  onSubmit(callback: (solution: Solution) => void): void;
}
