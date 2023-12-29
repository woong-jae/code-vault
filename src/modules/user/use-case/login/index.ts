import { persistRepositoryToken } from '../../infra/persistence';
import { createLogin } from './createLogin';
import getInitialToken from './getInitialToken';

const login = createLogin({
  getInitialToken,
  persistRepositoryToken,
});

export default login;
