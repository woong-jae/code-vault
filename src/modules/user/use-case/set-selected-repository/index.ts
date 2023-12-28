import { persistSelectedRepository } from '../../infra/persistence';
import { saveUser } from '../../infra/store';
import type { SetSelectedRepository } from '../types';

const setSelectedRepository: SetSelectedRepository = async repositoryName => {
  await persistSelectedRepository(repositoryName);
  saveUser({ selectedRepository: repositoryName });
};

export default setSelectedRepository;
