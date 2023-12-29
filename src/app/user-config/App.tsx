import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserSettingPage from '~/pages/user-setting';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSettingPage />
    </QueryClientProvider>
  );
}
