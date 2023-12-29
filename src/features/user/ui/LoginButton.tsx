import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Button } from '@base/components/Button';
import { url } from '@base/const/_url';
import login from '../use-case/login';

export default function LoginButton() {
  const queryClient = useQueryClient();

  useEffect(() => {
    async function tryLogin() {
      const isLoginSuccess = await login();
      if (!isLoginSuccess) return;

      queryClient.invalidateQueries({
        queryKey: ['isUserLoggedIn'],
      });
    }

    tryLogin();
  }, [queryClient]);

  return (
    <Button className="w-fit" asChild>
      <a href={url.GITHUB_OAUTH_CODE}>GitHub 로그인</a>
    </Button>
  );
}
