import createEventBus from '~/_shared/infrastructure/eventBus';
import EventHubAdaptor from './EventBusAdaptor';
import type { SolutionBus } from '../types';

type CreateSolutionBus = () => SolutionBus;

export const createSolutionBus: CreateSolutionBus = () => {
  return new EventHubAdaptor(createEventBus('background'));
};
