export type BojData = {
  command?: string;
  message?: {
    type: string;
    passed: boolean;
    msg: string;
  };
  identifier?: string;
  data?: string;
};
