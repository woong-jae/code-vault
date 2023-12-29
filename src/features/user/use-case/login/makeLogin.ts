import type { PersistRepositoryToken } from '../../infra/persistence/types';
import type { Login } from '../types';
import getInitialToken from './getInitialToken';
import type { GetInitialToken } from './types';

type Dependencies = {
  persistRepositoryToken: PersistRepositoryToken;
  getInitialToken: GetInitialToken;
};

export const makeLogin =
  ({ persistRepositoryToken }: Dependencies): Login =>
  async () => {
    const token = await getInitialToken();
    if (!token) return false;

    await persistRepositoryToken(token);

    return true;
  };
