import type { GetSelectedRepository } from '../types';
import { retrieveSelectedRepository } from '../../infras/persistence';

const getSelectedRepository: GetSelectedRepository = async () => {
  const selectedRepository = await retrieveSelectedRepository();
  return selectedRepository;
};

export default getSelectedRepository;
