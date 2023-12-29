import { retrieveSelectedRepository } from '../../infra/persistence';
import { saveUser } from '../../infra/store';
import type { GetSelectedRepository } from '../types';

const getSelectedRepository: GetSelectedRepository = async () => {
  const selectedRepository = await retrieveSelectedRepository();
  saveUser({ selectedRepository });
  return selectedRepository;
};

export default getSelectedRepository;
