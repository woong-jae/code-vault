import type { GetInitialToken } from '~/_features/user/core/ports.output';
import type { PersistRepositoryToken } from '../../infra/persistence/types';
import type { Login } from '../types';
import getInitialToken from './getInitialToken';

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
