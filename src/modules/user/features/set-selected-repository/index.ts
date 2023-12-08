import { persistSelectedRepository } from '../../infras/persistence';
import type { SetSelectedRepository } from '../types';

const setSelectedRepository: SetSelectedRepository = async repositoryName => {
  await persistSelectedRepository(repositoryName);
};

export default setSelectedRepository;
