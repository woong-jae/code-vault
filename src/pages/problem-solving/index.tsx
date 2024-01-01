import { useEffect } from 'react';
import { useAlert } from '@base/components/Alert';
import { onAlert } from '@base/infra/chrome-extension';

export function ProblemSolvingPage() {
  const { alert } = useAlert();

  useEffect(() => {
    onAlert((message) => {
      alert({
        title: '알림',
        description: message,
      });
    });
  }, [alert]);

  return <></>;
}
