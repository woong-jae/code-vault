import { SetSelectedRepository } from '../ports.input';
import { persistSelectedRepository } from '../../infrastructure/persistence';

const setSelectedRepository: SetSelectedRepository = repositoryName => {
  persistSelectedRepository(repositoryName);
};

export default setSelectedRepository;
