import Github from '~/services/Github';
import type { GetInitialToken } from '../../core/ports.output';

export const getInitialToken: GetInitialToken = async () => {
  const code = new URLSearchParams(location.search).get('code');
  if (!code) return null;

  history.replaceState('', '', location.pathname);

  const token = await Github.getAccessToken(code);
  return token;
};
