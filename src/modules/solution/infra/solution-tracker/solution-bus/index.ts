import EventHubAdaptor from './EventBusAdaptor';
import type { SolutionBus } from '../types';
import createEventBus from '@base/infra/event-bus';

type CreateSolutionBus = () => SolutionBus;

export const createSolutionBus: CreateSolutionBus = () => {
  return new EventHubAdaptor(createEventBus('background'));
};
