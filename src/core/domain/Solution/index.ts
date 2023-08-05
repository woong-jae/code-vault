import { z } from 'zod';

export const Platform = z.enum(['boj', 'programmers']);
export const ProgrammingLanguage = z.enum([
  'javascript',
  'java',
  'kotlin',
  'c',
  'cpp',
  'python',
  'unknown',
]);

const Solution = z.object({
  problemId: z.string(),
  platform: Platform,
  code: z.string(),
  language: ProgrammingLanguage,
  date: z.date(),
});

export default Solution;
