import { persistRepositoryToken } from '../../infras/persistence';
import setSelectedRepository from '../setSelectedRepository';
import type { Logout } from '../types';

const logout: Logout = async () => {
  await Promise.allSettled([
    persistRepositoryToken(null),
    setSelectedRepository(null),
  ]);

  return true;
};

export default logout;
