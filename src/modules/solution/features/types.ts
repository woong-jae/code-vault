import type { Solution } from '../domain/types';

export type SaveSolution = (solution: Solution) => Promise<boolean>;
