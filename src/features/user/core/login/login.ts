import { saveUser } from '../../infrastructure/store';
import type { Login } from '../ports.input';
import type {
  PersistRepositoryToken,
  GetInitialToken,
  SaveUser,
} from '../ports.output';

type Dependencies = {
  getInitialToken: GetInitialToken;
  persistRepositoryToken: PersistRepositoryToken;
  saveUser: SaveUser;
};

export const createLogin =
  ({ getInitialToken, persistRepositoryToken }: Dependencies): Login =>
  async () => {
    const token = await getInitialToken();
    if (!token) return false;

    await persistRepositoryToken(token);
    saveUser({ isLoggedIn: true });

    return true;
  };
