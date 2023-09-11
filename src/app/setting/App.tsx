import { useState } from 'react';
import LoginPage from '~/pages/Login';
import SettingPage from '~/pages/Setting';

export default function SettingApp() {
  const [isLoggedIn] = useState(false);

  return isLoggedIn ? <SettingPage /> : <LoginPage />;
}
