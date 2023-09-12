import type { Solution } from '../types';

export type CreateMessage = (solution: Solution) => string;

export const createMessage: CreateMessage = (solution: Solution) => {
  return `[${solution.platform}] ${solution.problemId} (Time: ${solution.time}ms, Memory: ${solution.memory}MB) - by Code-Vault`;
};
