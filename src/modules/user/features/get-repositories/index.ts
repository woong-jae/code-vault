import type { GetRepositories } from '../types';
import {
  retrieveRepositoryToken,
  retrieveRepositories,
} from '../../infras/persistence';

const getRepositories: GetRepositories = async () => {
  const repositoryToken = await retrieveRepositoryToken();
  if (!repositoryToken) return null;

  return retrieveRepositories(repositoryToken);
};

export default getRepositories;
