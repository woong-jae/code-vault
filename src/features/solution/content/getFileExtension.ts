import type { ProgrammingLanguage } from '../programming-language';

export type GetFileExtension = (
  programmingLanguage: ProgrammingLanguage,
) => string;

export const getFileExtension: GetFileExtension = (programmingLanguage) => {
  switch (programmingLanguage) {
    case 'c':
    case 'cpp':
    case 'java':
    case 'go':
      return programmingLanguage;
    case 'python':
      return 'py';
    case 'kotlin':
      return 'kt';
    case 'javascript':
      return 'js';
    case 'typescript':
      return 'ts';
    case 'rust':
      return 'rs';
    default:
      return 'txt';
  }
};
