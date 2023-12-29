import { useEffect } from 'react';
import { Button } from '@base/components/Button';
import { url } from '@base/const/_url';
import { useAuth } from '../context';

export default function LoginButton() {
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, [login]);

  return (
    <Button className="w-fit" asChild>
      <a href={url.GITHUB_OAUTH_CODE}>GitHub 로그인</a>
    </Button>
  );
}
