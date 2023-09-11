import RepositorySelector from '~/features/user/ui/RepositorySelector';
import UserProfile from '~/features/user/ui/UserProfile';

export default function SettingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex">
        <div className="mx-2">
          <UserProfile />
        </div>
        <div className="mx-2">
          <RepositorySelector />
        </div>
      </div>
    </div>
  );
}
