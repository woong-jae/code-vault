import type { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertProvider } from '@base/components/Alert';
import { ConfirmProvider } from '@base/components/Confirm';
import { ProblemSolvingPage } from '~/pages/problem-solving';
import '~/app/index.css';

function Panel({ children }: { children: ReactElement }) {
  return (
    <div className="fixed right-5 top-5 z-[100] min-w-[350px]">{children}</div>
  );
}

export function runApp() {
  const $div = document.createElement('div');

  document.body.append($div);

  const root = createRoot($div);
  root.render(
    <AlertProvider Wrapper={Panel}>
      <ConfirmProvider Wrapper={Panel}>
        <ProblemSolvingPage />
      </ConfirmProvider>
    </AlertProvider>,
  );
}
