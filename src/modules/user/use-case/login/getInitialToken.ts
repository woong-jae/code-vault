import { Github } from '@base/services/github';
import type { GetInitialToken } from './types';

const getInitialToken: GetInitialToken = async () => {
  const code = new URLSearchParams(location.search).get('code');
  if (!code) return null;

  history.replaceState('', '', location.pathname);

  const token = await Github.getAccessToken(code);
  return token;
};

export default getInitialToken;
