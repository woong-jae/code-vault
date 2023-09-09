import createEventBus from '~/services/eventBus';
import { CreateSolutionEventBus } from '../../core/ports.output';
import EventHubAdaptor from './EventBusAdaptor';

const createSolutionEventBus: CreateSolutionEventBus = () => {
  return new EventHubAdaptor(createEventBus('background'));
};

export default createSolutionEventBus;
