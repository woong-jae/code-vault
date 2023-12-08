import type { PersistRepositoryToken } from '../../infras/persistence/types';
import getInitialToken from './getInitialToken';
import type { Login } from '../types';
import type { GetInitialToken } from '~/_features/user/core/ports.output';

type Dependencies = {
  persistRepositoryToken: PersistRepositoryToken;
  getInitialToken: GetInitialToken;
};

export const createLogin =
  ({ persistRepositoryToken }: Dependencies): Login =>
  async () => {
    const token = await getInitialToken();
    if (!token) return false;

    await persistRepositoryToken(token);

    return true;
  };
