import type { ReactElement } from 'react';
import LogoutButton from '~/modules/user/ui/LogoutButton';
import RepositorySelector from '~/modules/user/ui/RepositorySelector';
import UserProfile from '~/modules/user/ui/UserProfile';
import Typography from '~/base/ui/Typography';

function Section({ children }: { children: ReactElement }) {
  return <div className="mt-5">{children}</div>;
}

export default function UserSettingPage() {
  const settings = [UserProfile, RepositorySelector, LogoutButton];

  return (
    <div className="mx-auto max-w-3xl px-5">
      <div className="mt-5">
        <Typography.h2>Code-Vault 설정</Typography.h2>
      </div>
      {settings.map((Setting) => (
        <Section>
          <Setting />
        </Section>
      ))}
    </div>
  );
}
