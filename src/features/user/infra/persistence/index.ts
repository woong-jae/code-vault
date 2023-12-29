import {
  chromeLocalStoragePersist,
  chromeLocalStorageRetrieve,
} from '~/base/infra/persistence/chromeLocalStorage';
import { Github } from '~/base/services/github';
import type {
  PersistRepositoryToken,
  RetrieveRepositoryToken,
  RetrieveUserProfile,
  PersistSelectedRepository,
  RetrieveSelectedRepository,
} from './types';

export const repositoryTokenKey = 'repository-token:code-vault';
export const selectedRepositoryKey = 'selected-repository:code-vault';

export const persistRepositoryToken: PersistRepositoryToken = async (
  accessToken: AccessToken,
) => {
  await chromeLocalStoragePersist(repositoryTokenKey, accessToken);
};
export const retrieveRepositoryToken: RetrieveRepositoryToken = async () => {
  return chromeLocalStorageRetrieve(repositoryTokenKey);
};

export const retrieveUserProfile: RetrieveUserProfile = async (
  accessToken: AccessToken,
) => {
  const githubRepository = new Github(accessToken);

  const userRichProfile = await githubRepository.getUserStatus();

  return {
    id: userRichProfile.login,
    email: userRichProfile.html_url,
    avatarUrl: userRichProfile.avatar_url,
  };
};
export const retrieveRepositories = async (accessToken: AccessToken) => {
  const githubRepository = new Github(accessToken);

  const repositories = await githubRepository.getRepositories();
  if (!repositories) return [];

  return repositories.map(({ name }) => name);
};
export const persistContent = async ({
  repositoryName,
  accessToken,
  path,
  content,
  message,
}: {
  repositoryName: string;
  accessToken: AccessToken;
  path: string;
  content: string;
  message: string;
}) => {
  const githubRepository = new Github(accessToken);

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

export const persistSelectedRepository: PersistSelectedRepository = async (
  repositoryName,
) => {
  await chromeLocalStoragePersist(selectedRepositoryKey, repositoryName);
};

export const retrieveSelectedRepository: RetrieveSelectedRepository =
  async () => {
    return chromeLocalStorageRetrieve(selectedRepositoryKey);
  };
