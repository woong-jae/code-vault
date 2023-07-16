export type SolutionData = {
  problemId: string;
  platform: string;
  code: string;
  language: string;
};

export type SolveListener = (solutionData: SolutionData) => void;
