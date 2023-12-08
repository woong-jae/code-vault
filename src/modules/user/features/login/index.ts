import { persistRepositoryToken } from '../../infras/persistence';
import getInitialToken from './getInitialToken';
import { createLogin } from './createLogin';

const login = createLogin({
  getInitialToken,
  persistRepositoryToken,
});

export default login;
