import { PersistSolution } from '../../core/ports.output';
import { Solution } from '../../core/types';

export const persistSolution: PersistSolution = async (solution: Solution) => {
  return true;
};
