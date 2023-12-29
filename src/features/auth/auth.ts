import { Github } from '@base/services/github';
import { defineChromeExtensionStorage } from '@base/utils/storage';
import type { AccessToken } from './types';

const accessTokenStorage = defineChromeExtensionStorage<AccessToken>({
  storage: chrome.storage.local,
  key: 'access-token',
});

async function getAccessTokenFromSearchParams() {
  const code = new URLSearchParams(location.search).get('code');
  if (!code) return null;

  history.replaceState('', '', location.pathname);

  const accessToken = await Github.getAccessToken(code);
  return accessToken as AccessToken;
}

async function login() {
  const token = await getAccessTokenFromSearchParams();
  if (!token) return undefined;

  await accessTokenStorage.persist(token);

  return token;
}

async function logout() {
  await accessTokenStorage.clear();
  return true;
}

export { login, logout, accessTokenStorage };
