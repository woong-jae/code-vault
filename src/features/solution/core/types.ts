/* Solution */
export type Platform = 'programmers' | 'boj' | 'leetcode';
export type MilliSecond = number;
export type MegaByte = number;
export type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
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
  time: MilliSecond;
  memory: MegaByte;
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
