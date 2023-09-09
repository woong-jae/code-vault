import { SolutionEventBus } from './types';

export type CreateSolutionEventBus = () => SolutionEventBus;

/* Adaptors */
export type SaveContentAdaptor = (
  path: string,
  content: string,
  message: string,
) => Promise<boolean>;
