import type { AccessToken } from '~/features/auth';
import { retrieveRepositories } from '../../infra/persistence';

const getRepositories = async (accessToken: AccessToken) => {
  return retrieveRepositories(accessToken);
};

export { getRepositories };
