import { persistSelectedRepository } from '../../infra/persistence';
import { saveUser } from '../../infra/store';

const setSelectedRepository = async (repositoryName: string) => {
  await persistSelectedRepository(repositoryName);
  saveUser({ selectedRepository: repositoryName });
};

export default setSelectedRepository;
