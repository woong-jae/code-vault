import { useEffect } from 'react';
import Url from '~/_shared/const/Url';
import { Button } from '~/_shared/ui/Button';
import login from '../features/login';

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
