import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { accessTokenStorage } from '~/features/auth';
import { createAuthProvider } from '~/features/auth/context';
import type { AccessToken } from '~/features/auth/types';
import App from './App';

const queryClient = new QueryClient();

export function runApp() {
  const $app = document.getElementById('app');
  if (!$app) {
    throw new Error('No element with "id=app"');
  }
  const root = createRoot($app);

  accessTokenStorage.retrieve().then((accessToken) => {
    const authInfo = {
      isLoggedIn: accessToken !== null,
      accessToken: accessToken || ('' as AccessToken),
    };

    const AuthProvider = createAuthProvider(authInfo);

    root.render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>,
    );
  });
}
