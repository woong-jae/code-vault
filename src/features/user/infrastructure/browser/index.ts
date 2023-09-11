import Github from '~/services/Github';
import { GetInitialToken } from '../../core/ports.output';

export const getInitialToken: GetInitialToken = async () => {
  const code = new URLSearchParams(location.search).get('code');
  if (!code) return null;

  const token = await Github.getAccessToken(code);
  return token;
};
