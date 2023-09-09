import SolutionTracker from './createSolutionTracker/SolutionTracker';
import { Platform, Solution, SolutionEventBus } from './types';

export type CreateSolution = (solution: Solution) => Promise<boolean>;

/* SolutionTracker */
export type CreateSolutionTracker = (
  solutionEventBus: SolutionEventBus,
) => SolutionTracker;

export type CreateSolutionEventEmitter = (platform: Platform) => void;
