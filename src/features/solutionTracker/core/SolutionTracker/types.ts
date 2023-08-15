import { Solution } from '~/features/solutionTracker/core/domain/Solution/types';

export type SolveListener = (solution: Solution) => void;

export type InterceptListener = (packet: string) => void;

export type SolutionInterceptListener = (data: SolutionStatus) => void;

export enum Process {
  START = 'START',
  SCORE = 'SCORE',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export type SolutionStatus = {
  process: Process;
  payload: Partial<Solution>;
};
