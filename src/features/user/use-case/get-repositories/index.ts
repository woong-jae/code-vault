import {
  retrieveRepositoryToken,
  retrieveRepositories,
} from '../../infra/persistence';

const getRepositories = async () => {
  const repositoryToken = await retrieveRepositoryToken();
  if (!repositoryToken) return null;

  return retrieveRepositories(repositoryToken);
};

export { getRepositories };
