import { createRoot } from 'react-dom/client';
import { AlertProvider } from '@base/components/Alert';
import { ConfirmProvider } from '@base/components/Confirm';
import { Panel } from '@base/components/Panel';
import { ProblemSolvingPage } from '~/pages/problem-solving';
import '~/app/index.css';
import './isolated.css';

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
