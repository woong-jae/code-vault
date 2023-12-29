import { persistRepositoryToken } from '../../infra/persistence';
import getInitialToken from './getInitialToken';
import { makeLogin } from './makeLogin';

const login = makeLogin({
  getInitialToken,
  persistRepositoryToken,
});

export default login;
