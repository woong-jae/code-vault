import { useEffect } from 'react';
import { useAlert } from '@base/components/Alert';
import { useConfirm } from '@base/components/Confirm';
import { onAlert, onCrossContextConfirm } from '@base/infra/chrome-extension';

export function ProblemSolvingPage() {
  const { alert } = useAlert();
  const { confirm } = useConfirm();

  useEffect(() => {
    onAlert((message) => {
      alert({
        title: '알림',
        description: message,
      });
    });
  }, [alert]);

  useEffect(() => {
    onCrossContextConfirm('isolated', (message, onConfirm) => {
      confirm({
        title: '알림',
        description: message,
        onConfirm,
      });
    });
  }, [confirm]);

  return <></>;
}
