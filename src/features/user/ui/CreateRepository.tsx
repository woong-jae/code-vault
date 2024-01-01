import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@base/components/AlertDialog';
import { Button } from '@base/components/Button';
import { Input } from '@base/components/Input';
import { useCreateRepository, useRepositoryName } from '../hooks/repository';

export function CreateRepository({
  accessToken,
  onSettled,
}: {
  accessToken: AccessToken;
  onSettled: (isSuccess: boolean) => void;
}) {
  const { repositoryName, setRepositoryName, isValid } = useRepositoryName();
  const createRepository = useCreateRepository({
    accessToken,
    onSettled: (isSuccess) => {
      setRepositoryName('');
      onSettled(isSuccess);
    },
  });

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Input
          id="create-repository"
          placeholder="저장소 이름을 입력해주세요"
          value={repositoryName}
          onChange={({ target: { value } }) => setRepositoryName(value)}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={!repositoryName || !isValid} className="w-[64px]">
              생성
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말 생성하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                {'새로운 저장소가 생성되고 "선택한 저장소"로 지정됩니다.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  createRepository.mutate(repositoryName);
                }}
              >
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <p className="ml-2 mt-1 text-xs">
        {
          '* 저장소 이름에는 ASCII 문자, 숫자, 그리고 ., -, _ 문자만 사용 가능합니다'
        }
      </p>
    </div>
  );
}
