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

type AlertContent = {
  title: string;
  description: string;
};

const AlertContext = createContext<{
  alert: (content: AlertContent) => void;
}>({
  alert: () => {},
});

export function AlertProvider({
  children,
  Wrapper,
}: {
  children: ReactElement;
  Wrapper: (prop: { children: ReactElement }) => ReactElement;
}) {
  const [isAlerting, setIsAlerting] = useState(false);
  const [content, setContent] = useState<AlertContent>({
    title: '',
    description: '',
  });

  const alert = useCallback(
    (props: AlertContent) => {
      setContent(props);
      setIsAlerting(true);
    },
    [setIsAlerting, setContent],
  );

  return (
    <AlertContext.Provider
      value={{
        alert,
      }}
    >
      {children}
      {isAlerting &&
        createPortal(
          <Wrapper>
            <Card>
              <CardHeader>
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>{content.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-row-reverse">
                <Button size="sm" onClick={() => setIsAlerting(false)}>
                  확인
                </Button>
              </CardFooter>
            </Card>
          </Wrapper>,
          document.body,
        )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
