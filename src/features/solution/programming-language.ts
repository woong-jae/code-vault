import { z } from 'zod';

export const ProgrammingLanguageEnum = z
  .enum([
    'javascript',
    'typescript',
    'java',
    'kotlin',
    'c',
    'cpp',
    'python',
    'go',
    'rust',
    'unknown',
  ])
  .default('unknown');

export type ProgrammingLanguage = z.infer<typeof ProgrammingLanguageEnum>;
