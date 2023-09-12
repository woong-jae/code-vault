import type { IsLoggedIn } from '../ports.input';
import { retrieveRepositoryToken } from '../../infrastructure/persistence';
import { saveUser } from '../../infrastructure/store';

const isLoggedIn: IsLoggedIn = async () => {
  const repositoryToken = await retrieveRepositoryToken();
  const result = repositoryToken !== null;

  saveUser({ isLoggedIn: result });

  return result;
};

export default isLoggedIn;
