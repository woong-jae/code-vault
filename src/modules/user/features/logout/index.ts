import { persistRepositoryToken } from '../../infras/persistence';
import setSelectedRepository from '../set-selected-repository';
import type { Logout } from '../types';

const logout: Logout = async () => {
  return await Promise.allSettled([
    persistRepositoryToken(null),
    setSelectedRepository(null),
  ])
    .then(() => true)
    .catch(() => false);
};

export default logout;
