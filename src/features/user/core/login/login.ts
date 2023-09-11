import { Login } from '../ports.input';
import { PersistRepositoryToken, GetInitialToken } from '../ports.output';

type Dependencies = {
  getInitialToken: GetInitialToken;
  persistRepositoryToken: PersistRepositoryToken;
};

export const createLogin =
  ({ getInitialToken, persistRepositoryToken }: Dependencies): Login =>
  async () => {
    const token = await getInitialToken();
    if (!token) return false;

    await persistRepositoryToken(token);

    return true;
  };
