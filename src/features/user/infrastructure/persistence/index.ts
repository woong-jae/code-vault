import { RepositoryToken } from '../../core/types';
import {
  PersistSelectedRepository,
  PersistRepositoryToken,
  RetrieveRepositories,
  RetrieveRepositoryToken,
} from '../../core/ports.output';
import {
  localStoragePersist,
  localStorageRetrieve,
} from '~/services/persistence/localStorage';
import Github from '~/services/Github';

const repositoryTokenKey = 'repository-token:code-vault';
const selectedRepositoryKey = 'selected-repository:code-vault';

export const persistRepositoryToken: PersistRepositoryToken = (
  repositoryToken: RepositoryToken,
) => {
  localStoragePersist(repositoryTokenKey, repositoryToken);
};
export const retrieveRepositoryToken: RetrieveRepositoryToken = () => {
  return localStorageRetrieve(repositoryTokenKey);
};

export const retrieveRepositories: RetrieveRepositories = async (
  repositoryToken: RepositoryToken,
) => {
  const githubRepository = new Github(repositoryToken);

  const repositories = await githubRepository.getRepositories();
  if (!repositories) return [];

  return repositories.map(({ name }) => name);
};

export const persistSelectedRepository: PersistSelectedRepository =
  repositoryName => {
    localStoragePersist(selectedRepositoryKey, repositoryName);
  };
