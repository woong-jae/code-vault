import RepositorySelector from '~/features/user/ui/RepositorySelector';
import UserProfile from '~/features/user/ui/UserProfile';

export default function SettingPage() {
  return (
    <div>
      <UserProfile />
      <RepositorySelector />
    </div>
  );
}
