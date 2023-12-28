import { useQueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserSettingPage from '~/pages/user-setting';

const queryClient = useQueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSettingPage />
    </QueryClientProvider>
  );
}
