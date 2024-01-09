import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAlert } from '@base/components/Alert';
import { Card, CardContent } from '@base/components/Card';
import { useConfirm } from '@base/components/Confirm';
import { Panel } from '@base/components/Panel';
import { onAlert, onCrossContextConfirm } from '@base/infra/chrome-extension';

export function ProblemSolvingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useAlert();
  const { confirm } = useConfirm();

  useEffect(() => {
    onAlert((message) => {
      setIsLoading(false);
      alert({
        title: '알림',
        description: message,
      });
    });
  }, [alert]);

  useEffect(() => {
    onCrossContextConfirm('isolated', (message, handleConfirm) => {
      confirm({
        title: '알림',
        description: message,
        onConfirm: (isConfirmed) => {
          if (isConfirmed) {
            setIsLoading(true);
          }
          handleConfirm(isConfirmed);
        },
      });
    });
  }, [confirm]);

  return (
    <>
      {isLoading &&
        createPortal(
          <Panel>
            <Card>
              <CardContent>
                <div className="mb-3 mt-5 flex flex-col items-center space-y-2">
                  <ReloadIcon className="h-5 w-5 animate-spin" />
                  <p className="text-muted-foreground">잠시만 기다려주세요</p>
                </div>
              </CardContent>
            </Card>
          </Panel>,
          document.body,
        )}
    </>
  );
}
