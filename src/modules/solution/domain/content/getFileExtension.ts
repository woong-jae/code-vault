import type { ProgrammingLanguage } from '../../types';

export type GetFileExtension = (
  programmingLanguage: ProgrammingLanguage,
) => string;

export const getFileExtension: GetFileExtension = programmingLanguage => {
  switch (programmingLanguage) {
    case 'c':
    case 'cpp':
    case 'java':
      return programmingLanguage;
    case 'python':
      return 'py';
    case 'kotlin':
      return 'kt';
    case 'javascript':
      return 'js';
    case 'typescript':
      return 'ts';
    default:
      return 'txt';
  }
};
