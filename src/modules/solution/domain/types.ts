/* Solution */
export type Platform = 'programmers' | 'boj' | 'leetcode';
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
  title: string;
  language: ProgrammingLanguage;
  code: string;
  time: MilliSecond;
  memory: MegaByte;
  link: Url;
};