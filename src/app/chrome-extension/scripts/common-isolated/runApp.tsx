import type { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertProvider } from '@base/components/Alert';
import '~/app/index.css';
import { ProblemSolvingPage } from '~/pages/problem-solving';

function Panel({ children }: { children: ReactElement }) {
  return (
    <div className="fixed right-5 top-5 z-50 min-w-[350px]">{children}</div>
  );
}

export function runApp() {
  const $div = document.createElement('div');

  document.body.append($div);

  const root = createRoot($div);
  root.render(
    <AlertProvider Wrapper={Panel}>
      <ProblemSolvingPage />
    </AlertProvider>,
  );
}
