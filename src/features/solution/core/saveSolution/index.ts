import { persistSolution } from '../../infrastructure/persistence';
import { SaveSolution } from '../ports.input';
import { Solution } from '../types';

const saveSolution: SaveSolution = async (solution: Solution) => {
  const isSuccess = await persistSolution(solution);
  return isSuccess;
};

export default saveSolution;
