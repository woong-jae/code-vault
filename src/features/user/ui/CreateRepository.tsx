import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
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
import { createRepository } from '..';

export function CreateRepository({
  accessToken,
  onSuccess,
}: {
  accessToken: AccessToken;
  onSuccess: (isSuccess: boolean) => void;
}) {
  const [repositoryName, setRepositoryName] = useState('');

  const createRepositoryMutation = useMutation({
    mutationFn: (repositoryName: string) => {
      return createRepository({
        accessToken,
        repositoryName,
      });
    },
    onSuccess: (isSuccess) => {
      setRepositoryName('');
      onSuccess(isSuccess);
    },
  });

  return (
    <div className="flex items-center space-x-2">
      <Input
        id="create-repository"
        placeholder="저장소 이름을 입력해주세요"
        value={repositoryName}
        onChange={({ target: { value } }) => setRepositoryName(value)}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={!repositoryName} className="w-[64px]">
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
                createRepositoryMutation.mutate(repositoryName);
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
