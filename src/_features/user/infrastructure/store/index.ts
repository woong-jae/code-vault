import type {
  SelectIsUserLoggedIn,
  SelectSelectedRepository,
} from '../../core/ports.input';
import type { ReadUser, SaveUser } from '../../core/ports.output';
import { user } from './store';

export const readUser: ReadUser = user.getState;
export const saveUser: SaveUser = user.setState;

export const useIsUserLoggedIn: SelectIsUserLoggedIn = () =>
  user(model => model.isLoggedIn);

export const useSelectedRepository: SelectSelectedRepository = () =>
  user(model => model.selectedRepository);
