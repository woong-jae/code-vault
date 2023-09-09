import SolutionTracker from './createSolutionTracker/SolutionTracker';
import { Platform, Solution, SolutionEventBus } from './types';

export type SaveSolution = (solution: Solution) => Promise<boolean>;

/* SolutionTracker */
export type CreateSolutionTracker = (
  solutionEventBus: SolutionEventBus,
) => SolutionTracker;
export type CreateSolutionEventEmitter = (platform: Platform) => void;
