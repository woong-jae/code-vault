import { useEffect, useState } from 'react';

type Status = 'success' | 'pending' | 'failure';
type Query<T> = () => {
  status: Status;
  isLoading: boolean;
  data: null | T;
};
// type Command<T> = () => {
//   status: Status;
//   execute: T;
// };

export const asQuery =
  <T>(query: () => Promise<T | null>): Query<T> =>
  () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<Status>('pending');
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
      async function tryFetch() {
        const data = await query();
        setData(data);
        setIsLoading(false);
        setStatus('success');
      }

      tryFetch();
    }, [query]);

    return {
      status,
      isLoading,
      data,
    };
  };
