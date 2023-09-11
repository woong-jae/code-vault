import { persistRepositoryToken } from '../../infrastructure/persistence';
import { Logout } from '../ports.input';

const logout: Logout = async () => {
  await persistRepositoryToken(null);
  return true;
};

export default logout;
