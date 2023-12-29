import type { ReactElement } from 'react';
import Typography from '@base/components/Typography';
import { LoginButton, LogoutButton } from '~/features/auth';
import { useAuth } from '~/features/auth/context';
import {
  RepositorySelector,
  UserProfile,
  clearSelectedRepository,
} from '~/features/user';

function Section({ children }: { children: ReactElement }) {
  return <div className="mt-5">{children}</div>;
}

function Footer() {
  return (
    <div className="mb-8 mt-4 text-center">
      <p className="text-muted-foreground">
        문의사항 및 개선사항은{' '}
        <a
          className="text-primary underline"
          href="https://github.com/woong-jae/code-vault"
        >
          깃허브
        </a>
        를 통해 알려주세요
      </p>
      <p className="text-muted-foreground">Star는 개발자에게 힘이 됩니다</p>
      <p className="text-muted-foreground">
        from{' '}
        <a className="text-primary" href="https://woong-jae.com">
          woong-jae
        </a>
      </p>
    </div>
  );
}

export default function UserSettingPage() {
  const { isLoggedIn, accessToken } = useAuth();

  function handleLogout() {
    clearSelectedRepository();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[600px] flex-col justify-between px-5">
      <div>
        {isLoggedIn ? (
          <>
            <div className="mt-5">
              <Typography.h2>Code-Vault 설정</Typography.h2>
            </div>
            <Section>
              <UserProfile accessToken={accessToken} />
            </Section>
            <Section>
              <RepositorySelector accessToken={accessToken} />
            </Section>
            <Section>
              <LogoutButton onLogout={handleLogout} />
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
      <Footer />
    </div>
  );
}
