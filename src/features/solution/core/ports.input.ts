import SolutionTracker from './createSolutionTracker/SolutionTracker';
import type { Platform, Solution } from './types';

export type SaveSolution = (solution: Solution) => Promise<boolean>;

/* SolutionTracker */
export type CreateSolutionTracker = () => SolutionTracker;
export type CreateSolutionEventEmitter = (platform: Platform) => void;
