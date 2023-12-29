import {
  retrieveRepositoryToken,
  retrieveRepositories,
} from '../../infra/persistence';
import type { GetRepositories } from '../types';

const getRepositories: GetRepositories = async () => {
  const repositoryToken = await retrieveRepositoryToken();
  if (!repositoryToken) return null;

  return retrieveRepositories(repositoryToken);
};

export default getRepositories;
