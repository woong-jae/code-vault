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
