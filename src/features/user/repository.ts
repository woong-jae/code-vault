import { Github } from '@base/services/github';
import { defineChromeExtensionStorage } from '@base/utils/storage';

export const selectedRepositoryStorage = defineChromeExtensionStorage<string>({
  storage: chrome.storage.local,
  key: 'selected-repository',
});

export async function getSelectedRepository(accessToken: AccessToken) {
  const selectedRepositoryName = await selectedRepositoryStorage.retrieve();
  if (!selectedRepositoryName) return null;

  const repositories = await retrieveRepositories(accessToken);
  if (!repositories.includes(selectedRepositoryName)) {
    await clearSelectedRepository();
    return null;
  }

  return selectedRepositoryName;
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
  message,
  contents,
}: {
  accessToken: AccessToken;
  message: string;
  contents: { path: string; content: string }[];
}) {
  const selectedRepositoryName = await getSelectedRepository(accessToken);

  if (!accessToken || !selectedRepositoryName) return false;

  const githubRepository = new Github(accessToken);

  const userProfile = await githubRepository.getUserStatus();
  const primaryEmail = await githubRepository.getUserPrimaryEmail();

  if (!primaryEmail) {
    throw new Error('No primary email set for user');
  }

  return githubRepository.uploadContents({
    owner: userProfile.login,
    repo: selectedRepositoryName,
    userName: userProfile.login,
    email: primaryEmail,
    message,
    contents,
  });
}

export async function createRepository({
  repositoryName,
  accessToken,
}: {
  repositoryName: string;
  accessToken: AccessToken;
}) {
  if (!repositoryName) return false;

  const githubRepository = new Github(accessToken);
  const isSuccess = await githubRepository.createRepository({
    name: repositoryName,
    description: 'Code-Vault 풀이 저장소',
  });

  if (!isSuccess) return false;

  await setSelectedRepository(repositoryName);

  await persistContent({
    accessToken,
    message: 'Initial commit - by Code-Vault',
    contents: [
      {
        path: 'README.md',
        content:
          '# Code-Vault 풀이 저장소\n\n Code-Vault에서 생성된 알고리즘 문제 풀이 저장소',
      },
    ],
  });

  return true;
}

const repositoryNameRegex = /^[\w_.-]+$/;

export function validateRepositoryName(name: string) {
  return repositoryNameRegex.test(name);
}
