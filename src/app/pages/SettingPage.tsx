import Profile from '../widgets/Profile';
import Settings from '../widgets/Settings';

export default function SettingPage() {
  return (
    <div class="flex min-h-screen min-w-fit items-center justify-center">
      <div class="mx-2">
        <Profile
          login="woong-jae"
          avatar_url="https://avatars.githubusercontent.com/u/33976823?v=4"
          name="Jae Woong Chung"
        />
      </div>
      <div class="mx-2">
        <Settings />
      </div>
    </div>
  );
}
