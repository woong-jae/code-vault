export type InterceptedData = {
  problemId: string;
  platform: string;
  code: string;
  language: string;
};

export type InterceptListener = (interceptedData: InterceptedData) => void;
