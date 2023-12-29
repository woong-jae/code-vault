import { Github } from '@base/services/github';
import { defineChromeExtensionStorage } from '@base/utils/storage';

export const selectedRepositoryStorage = defineChromeExtensionStorage<string>({
  storage: chrome.storage.local,
  key: 'selected-repository',
});

export async function getSelectedRepository() {
  return selectedRepositoryStorage.retrieve();
}

export async function setSelectedRepository(value: string) {
  await selectedRepositoryStorage.persist(value);
}

export async function clearSelectedRepository() {
  await selectedRepositoryStorage.clear();
}

export async function retrieveRepositories(accessToken: AccessToken) {
  const githubRepository = new Github(accessToken);

  const repositories = await githubRepository.getRepositories();
  if (!repositories) return [];

  return repositories.map(({ name }) => name);
}

export async function persistContent({
  accessToken,
  path,
  content,
  message,
}: {
  accessToken: AccessToken;
  path: string;
  content: string;
  message: string;
}) {
  const selectedRepositoryName = await getSelectedRepository();

  if (!accessToken || !selectedRepositoryName) return false;

  const githubRepository = new Github(accessToken);

  const userProfile = await githubRepository.getUserStatus();
  const primaryEmail = await githubRepository.getUserPrimaryEmail();

  if (!primaryEmail) {
    throw new Error('No primary email set for user');
  }

  return githubRepository.createRepositoryContent({
    owner: userProfile.login,
    repo: selectedRepositoryName,
    path,
    content,
    userName: userProfile.login,
    email: primaryEmail,
    message,
  });
}
