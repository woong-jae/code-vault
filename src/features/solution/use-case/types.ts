import type { Solution } from '../types';

export type SaveSolution = (solution: Solution) => Promise<boolean>;
