import { persistRepositoryToken } from '../../infras/persistence';
import { createLogin } from './login';

const login = createLogin({
  persistRepositoryToken,
});

export default login;
