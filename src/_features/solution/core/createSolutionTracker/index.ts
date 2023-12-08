import type { CreateSolutionTracker } from '../ports.input';
import createSolutionEventBus from '../../infrastructure/eventBus';
import SolutionTracker from './SolutionTracker';

const createSolutionTracker: CreateSolutionTracker = () => {
  return new SolutionTracker(createSolutionEventBus());
};

export default createSolutionTracker;
