import type { GetSelectedRepository } from '../ports.input';
import { retrieveSelectedRepository } from '../../infrastructure/persistence';
import { saveUser } from '../../infrastructure/store';

const getSelectedRepository: GetSelectedRepository = async () => {
  const selectedRepository = await retrieveSelectedRepository();
  saveUser({ selectedRepository });
  return selectedRepository;
};

export default getSelectedRepository;
