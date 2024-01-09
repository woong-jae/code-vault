import type { ReactElement } from 'react';

export function Panel({ children }: { children: ReactElement }) {
  return (
    <div className="fixed right-5 top-5 z-[100] min-w-[350px]">{children}</div>
  );
}
