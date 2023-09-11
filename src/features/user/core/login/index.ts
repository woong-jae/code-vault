import { getInitialToken } from '../../infrastructure/browser';
import { persistRepositoryToken } from '../../infrastructure/persistence';
import { createLogin } from './login';

const login = createLogin({
  getInitialToken,
  persistRepositoryToken,
});

export default login;
