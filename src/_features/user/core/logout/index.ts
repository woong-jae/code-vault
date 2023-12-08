import type { Logout } from '../ports.input';
import { saveUser } from '../../infrastructure/store';
import { persistRepositoryToken } from '../../infrastructure/persistence';
import setSelectedRepository from '../setSelectedRepository';

const logout: Logout = async () => {
  saveUser({ isLoggedIn: false });

  await Promise.allSettled([
    persistRepositoryToken(null),
    setSelectedRepository(null),
  ]);

  return true;
};

export default logout;
