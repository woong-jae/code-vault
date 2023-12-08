import { retrieveRepositoryToken } from '../../infras/persistence';
import type { IsLoggedIn } from '../types';

const isLoggedIn: IsLoggedIn = async () => {
  const repositoryToken = await retrieveRepositoryToken();
  const result = repositoryToken !== null;

  return result;
};

export default isLoggedIn;
