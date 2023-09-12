import type { SetSelectedRepository } from '../ports.input';
import { persistSelectedRepository } from '../../infrastructure/persistence';
import { saveUser } from '../../infrastructure/store';

const setSelectedRepository: SetSelectedRepository = async repositoryName => {
  saveUser({ selectedRepository: repositoryName });
  await persistSelectedRepository(repositoryName);
};

export default setSelectedRepository;
