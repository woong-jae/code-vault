import { Loading } from '~/contexts/loading';
import UserSettingPage from '~/pages/user-setting';

export default function App() {
  return (
    <>
      <UserSettingPage />
      <Loading />
    </>
  );
}
