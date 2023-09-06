import { GetRepositories } from '../ports.input';
import {
  retrieveRepositories,
  retrieveRepositoryToken,
} from '../../infrastructure/persistence';

const getRepositories: GetRepositories = async () => {
  const repositoryToken = retrieveRepositoryToken();
  if (!repositoryToken) return null;

  return retrieveRepositories(repositoryToken);
};

export default getRepositories;
