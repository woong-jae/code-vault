import type { PersistRepositoryToken } from '../../infras/persistence/types';
import getInitialToken from './getInitialToken';
import type { Login } from '../types';

type Dependencies = {
  persistRepositoryToken: PersistRepositoryToken;
};

export const createLogin =
  ({ persistRepositoryToken }: Dependencies): Login =>
  async () => {
    const token = await getInitialToken();
    if (!token) return false;

    await persistRepositoryToken(token);

    return true;
  };
