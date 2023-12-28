import { useEffect } from 'react';
import login from '../use-case/login';
import Url from '@base/const/url';
import { Button } from '@base/ui/Button';

interface Props {
  onLoginSuccess: () => void;
}

export default function LoginButton({ onLoginSuccess }: Props) {
  useEffect(() => {
    async function tryLogin() {
      const isLoginSuccess = await login();
      if (!isLoginSuccess) return;

      onLoginSuccess();
    }

    tryLogin();
  }, []);

  return (
    <Button className="w-fit" asChild>
      <a href={Url.GITHUB_OAUTH_CODE}>GitHub 로그인</a>
    </Button>
  );
}
