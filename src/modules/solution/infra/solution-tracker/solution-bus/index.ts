import createEventBus from '@base/infra/event-bus';
import type { SolutionBus } from '../types';
import EventHubAdaptor from './EventBusAdaptor';

type CreateSolutionBus = () => SolutionBus;

export const createSolutionBus: CreateSolutionBus = () => {
  return new EventHubAdaptor(createEventBus('background'));
};
