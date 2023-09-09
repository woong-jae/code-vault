import { GetSelectedRepository } from '../ports.input';
import { retrieveSelectedRepository } from '../../infrastructure/persistence';

const getSelectedRepository: GetSelectedRepository = () => {
  return retrieveSelectedRepository();
};

export default getSelectedRepository;
