import { retrieveSelectedRepository } from '../../infra/persistence';
import { saveUser } from '../../infra/store';

const getSelectedRepository = async () => {
  const selectedRepository = await retrieveSelectedRepository();
  saveUser({ selectedRepository });
  return selectedRepository;
};

export default getSelectedRepository;
