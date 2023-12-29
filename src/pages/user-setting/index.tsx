import Typography from '@base/ui/Typography';
import { useQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import LoginButton from '~/modules/user/ui/LoginButton';
import LogoutButton from '~/modules/user/ui/LogoutButton';
import UserProfile from '~/modules/user/ui/UserProfile';
import UserRepository from '~/modules/user/ui/UserRepository';
import isLoggedIn from '~/modules/user/use-case/is-logged-in';

function Section({ children }: { children: ReactElement }) {
  return <div className="mt-5">{children}</div>;
}

export default function UserSettingPage() {
  const { data } = useQuery({
    queryKey: ['isUserLoggedIn'],
    queryFn: isLoggedIn,
  });

  return (
    <div className="mx-auto max-w-[600px] px-5">
      {data ? (
        <>
          <div className="mt-5">
            <Typography.h2>Code-Vault 설정</Typography.h2>
          </div>
          <Section>
            <UserProfile />
          </Section>
          <Section>
            <UserRepository />
          </Section>
          <Section>
            <LogoutButton />
          </Section>
        </>
      ) : (
        <div className="mx-auto flex h-[600px] w-full flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Login to Github
            </h1>
            <p className="text-base text-muted-foreground">
              깃허브에 로그인 후 Code-Vault를 사용할 수 있습니다.
            </p>
          </div>
          <div className="mx-auto">
            <LoginButton />
          </div>
        </div>
      )}
    </div>
  );
}
