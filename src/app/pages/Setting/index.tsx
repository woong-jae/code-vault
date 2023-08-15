import LoginWidget from '~/app/widgets/Login';
import Layout from './Layout';
import appState from '~/app/signals/appState';
import ProfileWidget from '~/app/widgets/Profile';
import SettingsWidget from '~/app/widgets/Settings';

export default function SettingPage() {
  return (
    <Layout>
      {appState.value === 'login' && <LoginWidget />}
      {appState.value === 'setting' && (
        <div class="flex items-center justify-center">
          <ProfileWidget
            login="woong-jae"
            avatar_url="https://avatars.githubusercontent.com/u/33976823?v=4"
            name="Jae Woong Chung"
          />
          <div class="ml-4">
            <SettingsWidget />
          </div>
        </div>
      )}
    </Layout>
  );
}
