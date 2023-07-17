export type SolutionData = {
  problemId: string;
  platform: string;
  code: string;
  language: string;
};

export type SolveListener = (solutionData: SolutionData) => void;

export type InterceptListener = (packet: string) => void;

export enum Process {
  START = 'START',
  SCORE = 'SCORE',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export type SolutionStatus = {
  process: Process;
  payload: Partial<SolutionData>;
};
