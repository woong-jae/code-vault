import { Solution, SolutionEventBus } from './types';

export type CreateSolutionEventBus = () => SolutionEventBus;

export type PersistSolution = (solution: Solution) => Promise<boolean>;
