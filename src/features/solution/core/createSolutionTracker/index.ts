import { CreateSolutionTracker } from '../ports.input';
import createSolutionEventBus from '../../adaptor/createSolutionEventBus';
import SolutionTracker from './SolutionTracker';

const createSolutionTracker: CreateSolutionTracker = () => {
  return new SolutionTracker(createSolutionEventBus());
};

export default createSolutionTracker;
