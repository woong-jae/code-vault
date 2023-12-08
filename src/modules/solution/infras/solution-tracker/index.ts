import { createSolutionBus } from './solution-bus';
import SolutionTracker from './SolutionTracker';

export type CreateSolutionTracker = () => SolutionTracker;

const createSolutionTracker: CreateSolutionTracker = () => {
  return new SolutionTracker(createSolutionBus());
};

export default createSolutionTracker;
