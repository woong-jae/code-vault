import { Solution } from '../types';

export type CreateMessage = (solution: Solution) => string;

export const createMessage: CreateMessage = (solution: Solution) => {
  return `[${solution.platform}] ${solution.problemId}`;
};
