/* Solution */
export type Platform = 'programmers' | 'boj';
export type ProgrammingLanguage =
  | 'javascript'
  | 'java'
  | 'kotlin'
  | 'c'
  | 'cpp'
  | 'python'
  | 'unknown';
export type Solution = {
  problemId: string;
  platform: Platform;
  language: ProgrammingLanguage;
  code: string;
};

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

export interface SolutionEventBus {
  onIntercept(callback: SolutionInterceptListener): void;
}
