import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type ReactElement } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@base/components/AlertDialog';
import { Button } from '@base/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@base/components/Card';
import { Input } from '@base/components/Input';
import { Label } from '@base/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@base/components/Select';
import {
  createRepository,
  getSelectedRepository,
  retrieveRepositories,
  setSelectedRepository,
} from '../repository';

function withLabel({
  labelName,
  labelId,
  children,
}: {
  labelName: string;
  labelId: string;
  children: ReactElement;
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={labelId}>{labelName}</Label>
      {children}
    </div>
  );
}

export default function RepositorySetting({
  accessToken,
}: {
  accessToken: AccessToken;
}) {
  const [repositoryName, setRepositoryName] = useState('');
  const queryClient = useQueryClient();
  const { data: repositories, isLoading: isLoadingRepositories } = useQuery({
    queryKey: [accessToken, 'repositories'],
    queryFn: () => retrieveRepositories(accessToken),
  });
  const { data: selectedRepository, isLoading: isLoadingSelectedRepository } =
    useQuery({
      queryKey: [accessToken, 'selectedRepository'],
      queryFn: () => getSelectedRepository(accessToken),
    });
  const createRepositoryMutation = useMutation({
    mutationFn: (repositoryName: string) => {
      return createRepository({
        accessToken,
        repositoryName,
      });
    },
    onSuccess: (isSuccess) => {
      if (!isSuccess) return;

      queryClient.invalidateQueries({
        queryKey: [accessToken, 'repositories'],
        type: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: [accessToken, 'selectedRepository'],
        type: 'active',
      });

      setRepositoryName('');
    },
  });

  const loaded = !isLoadingRepositories && !isLoadingSelectedRepository;

  async function handleSelectChange(value: string) {
    await setSelectedRepository(value);
    queryClient.refetchQueries({
      queryKey: [accessToken, 'selectedRepository'],
      type: 'active',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>저장소 설정</CardTitle>
        <CardDescription>선택된 저장소에 풀이가 저장됩니다.</CardDescription>
      </CardHeader>
      <CardContent>
        {loaded && (
          <div className="flex flex-col space-y-6">
            {withLabel({
              labelId: 'selected-repository',
              labelName: '선택한 저장소',
              children: (
                <Select
                  onValueChange={handleSelectChange}
                  value={selectedRepository || undefined}
                >
                  <SelectTrigger id="selected-repository">
                    <SelectValue placeholder="저장소를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[240px]">
                    {repositories?.map((repositoryName) => (
                      <SelectItem key={repositoryName} value={repositoryName}>
                        {repositoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ),
            })}
            {withLabel({
              labelId: 'create-repository',
              labelName: '저장소 생성하기',
              children: (
                <div className="flex items-center space-x-2">
                  <Input
                    id="create-repository"
                    placeholder="저장소 이름을 입력해주세요"
                    value={repositoryName}
                    onChange={({ target: { value } }) =>
                      setRepositoryName(value)
                    }
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button disabled={!repositoryName} className="w-[64px]">
                        생성
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          정말 생성하시겠습니까?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {
                            '새로운 저장소가 생성되고 "선택한 저장소"로 지정됩니다.'
                          }
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
              ),
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
