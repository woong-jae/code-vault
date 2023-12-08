import { createLogin } from './login';
import { getInitialToken } from '../../infrastructure/browser';
import { persistRepositoryToken } from '../../infrastructure/persistence';
import { saveUser } from '../../infrastructure/store';

const login = createLogin({
  getInitialToken,
  persistRepositoryToken,
  saveUser,
});

export default login;
