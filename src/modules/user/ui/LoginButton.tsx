import { useEffect } from 'react';
import login from '../use-case/login';
import Url from '@base/const/url';
import { Button } from '@base/ui/Button';
import { useQueryClient } from '@tanstack/react-query';

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
  }, []);

  return (
    <Button className="w-fit" asChild>
      <a href={Url.GITHUB_OAUTH_CODE}>GitHub 로그인</a>
    </Button>
  );
}
