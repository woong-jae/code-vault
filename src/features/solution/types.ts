import type { ProgrammingLanguage } from './programming-language';

/* Solution */
type MilliSecond = number;
type MegaByte = number;
type Url = string;

export type Platform = 'programmers' | 'boj' | 'leetcode';
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
