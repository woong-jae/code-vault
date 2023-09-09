import { RepositoryName, RepositoryToken } from '../../core/types';
import {
  PersistSelectedRepository,
  PersistRepositoryToken,
  RetrieveRepositories,
  RetrieveRepositoryToken,
  RetrieveSelectedRepository,
  PersistContent,
  RetrieveUserProfile,
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

export const retrieveUserProfile: RetrieveUserProfile = async (
  repositoryToken: RepositoryToken,
) => {
  const githubRepository = new Github(repositoryToken);

  const userRichProfile = await githubRepository.getUserStatus();

  return {
    id: userRichProfile.login,
    email: userRichProfile.html_url,
    avatarUrl: userRichProfile.avatar_url,
  };
};
export const retrieveRepositories: RetrieveRepositories = async (
  repositoryToken: RepositoryToken,
) => {
  const githubRepository = new Github(repositoryToken);

  const repositories = await githubRepository.getRepositories();
  if (!repositories) return [];

  return repositories.map(({ name }) => name);
};
export const persistContent: PersistContent = async ({
  repositoryName,
  repositoryToken,
  path,
  content,
  message,
}: {
  repositoryName: RepositoryName;
  repositoryToken: RepositoryToken;
  path: string;
  content: string;
  message: string;
}) => {
  const githubRepository = new Github(repositoryToken);

  const userProfile = await githubRepository.getUserStatus();

  const primaryEmail = await githubRepository.getUserPrimaryEmail();
  if (!primaryEmail) {
    throw new Error('No primary email set for user');
  }

  return githubRepository.createRepositoryContent({
    owner: userProfile.login,
    repo: repositoryName,
    path,
    content,
    userName: userProfile.login,
    email: primaryEmail,
    message,
  });
};

export const persistSelectedRepository: PersistSelectedRepository =
  repositoryName => {
    localStoragePersist(selectedRepositoryKey, repositoryName);
  };

export const retrieveSelectedRepository: RetrieveSelectedRepository = () => {
  return localStorageRetrieve(selectedRepositoryKey);
};
