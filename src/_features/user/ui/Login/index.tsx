import { useEffect } from 'react';
import Url from '~/_shared/const/Url';
import { Button } from '~/_shared/ui/Button';
import login from '../../core/login';

export default function Login() {
  useEffect(() => {
    login();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pb-16">
      <h1 className="mb-6 text-8xl font-bold text-neutral-700">Code Vault</h1>
      <Button className="w-fit" asChild>
        <a href={Url.GITHUB_OAUTH_CODE}>GitHub 로그인</a>
      </Button>
    </div>
  );
}
