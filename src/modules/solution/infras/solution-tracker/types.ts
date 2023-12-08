import type { Solution } from '../../domain/types';

/* SolutionTracker */
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

export interface SolutionBus {
  onIntercept(callback: SolutionInterceptListener): void;
}
