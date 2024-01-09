import { createPortal } from 'react-dom';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../Card';
import { Button } from '../Button';
import {
  createContext,
  useContext,
  useState,
  type ReactElement,
  useCallback,
} from 'react';

type ConfirmProps = {
  title: string;
  description: string;
  onConfirm: (isConfirmed: boolean) => void;
};

const ConfirmContext = createContext<{
  confirm: (props: ConfirmProps) => void;
}>({
  confirm: () => false,
});

export function ConfirmProvider({
  children,
  Wrapper,
}: {
  children: ReactElement;
  Wrapper: (prop: { children: ReactElement }) => ReactElement;
}) {
  const [pendingConfirm, setPendingConfirm] = useState(false);
  const [props, setProps] = useState<ConfirmProps>({
    title: '',
    description: '',
    onConfirm: () => false,
  });

  const confirm = useCallback(
    (props: ConfirmProps) => {
      setProps(props);
      setPendingConfirm(true);
    },
    [setPendingConfirm, setProps],
  );

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
      }}
    >
      {children}
      {pendingConfirm &&
        createPortal(
          <Wrapper>
            <Card>
              <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-row justify-end space-x-2">
                <Button
                  size="sm"
                  variant={'outline'}
                  onClick={() => {
                    setPendingConfirm(false);
                    props.onConfirm(false);
                  }}
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setPendingConfirm(false);
                    props.onConfirm(true);
                  }}
                >
                  확인
                </Button>
              </CardFooter>
            </Card>
          </Wrapper>,
          document.body,
        )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
