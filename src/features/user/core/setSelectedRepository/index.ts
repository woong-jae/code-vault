import { SetSelectedRepository } from '../ports.input';
import { persistSelectedRepository } from '../../infrastructure/persistence';

const setSelectedRepository: SetSelectedRepository = async repositoryName => {
  await persistSelectedRepository(repositoryName);
};

export default setSelectedRepository;
