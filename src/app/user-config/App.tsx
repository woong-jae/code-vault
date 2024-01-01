import { Loading } from '@base/components/Loading';
import { Toaster } from '@base/components/Toaster';
import UserSettingPage from '~/pages/user-setting';

export default function App() {
  return (
    <>
      <UserSettingPage />
      <Loading />
      <Toaster />
    </>
  );
}
