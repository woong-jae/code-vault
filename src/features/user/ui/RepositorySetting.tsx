import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type ReactElement } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@base/components/Card';
import { Label } from '@base/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@base/components/Select';
import {
  getSelectedRepository,
  retrieveRepositories,
  setSelectedRepository,
} from '../repository';
import { CreateRepository } from './CreateRepository';

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
                <CreateRepository
                  accessToken={accessToken}
                  onSuccess={async (isSuccess) => {
                    if (!isSuccess) return;

                    queryClient.invalidateQueries({
                      queryKey: [accessToken, 'repositories'],
                      type: 'active',
                    });
                    queryClient.invalidateQueries({
                      queryKey: [accessToken, 'selectedRepository'],
                      type: 'active',
                    });
                  }}
                />
              ),
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
