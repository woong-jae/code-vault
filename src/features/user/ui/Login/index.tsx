import Url from '~/shared/const/Url';
import { Button } from '~/shared/ui/Button';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center pb-16">
      <h1 className="mb-4 text-8xl font-bold text-neutral-700">Code Vault</h1>
      <Button className="w-fit text-lg" asChild>
        <a href={Url.GITHUB_OAUTH_CODE}>GitHub 로그인</a>
      </Button>
    </div>
  );
}
