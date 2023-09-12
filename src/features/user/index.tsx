import RepositorySelector from './ui/RepositorySelector';
import UserProfile from './ui/UserProfile';
import Login from './ui/Login';
import { asQuery } from '~/shared/infrastructure/cqs';
import isLoggedIn from './core/isLoggedIn';
import { useIsUserLoggedIn } from './infrastructure/store';

const useIsUserLoggedInQuery = asQuery(isLoggedIn);

export default function User() {
  const { isLoading } = useIsUserLoggedInQuery();
  const isLoggedIn = useIsUserLoggedIn();

  if (isLoading) return null;

  return isLoggedIn ? (
    <div className="flex">
      <div className="mx-2">
        <UserProfile />
      </div>
      <div className="mx-2">
        <RepositorySelector />
      </div>
    </div>
  ) : (
    <Login />
  );
}
