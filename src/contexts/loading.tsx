import { ReloadIcon } from '@radix-ui/react-icons';
import { useIsMutating } from '@tanstack/react-query';
import { createPortal } from 'react-dom';

export function Loading() {
  const isMutating = useIsMutating();

  return (
    <div>
      {isMutating &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2 pb-3">
              <ReloadIcon className="h-5 w-5 animate-spin" />
              <p className="text-muted-foreground">잠시만 기다려주세요</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
