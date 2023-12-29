import { createContext, useContext, type ReactElement, useState } from 'react';
import { login, logout } from './auth';

const AuthContext = createContext<{
  isLoggedIn: boolean;
  accessToken: AccessToken;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  isLoggedIn: false,
  accessToken: '' as AccessToken,
  login: async () => {},
  logout: async () => {},
});

export function createAuthProvider(initialValue: {
  isLoggedIn: boolean;
  accessToken?: AccessToken;
}) {
  const AuthProvider = ({ children }: { children: ReactElement }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(initialValue.isLoggedIn);
    const [accessToken, setAccessToken] = useState<AccessToken>(
      initialValue.accessToken || ('' as AccessToken),
    );

    async function handleLogin() {
      const accessToken = await login();
      if (!accessToken) return;

      setAccessToken(accessToken);
      setIsLoggedIn(true);
    }

    async function handleLogout() {
      await logout();

      setAccessToken('' as AccessToken);
      setIsLoggedIn(false);
    }

    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          accessToken,
          login: handleLogin,
          logout: handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  return AuthProvider;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
