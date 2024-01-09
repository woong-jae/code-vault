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
import { useSelectRepository } from '../hooks/repository';
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
  const { repositories, selectedRepository, isLoaded, selectRepository } =
    useSelectRepository({ accessToken });

  return (
    <Card>
      <CardHeader>
        <CardTitle>저장소 설정</CardTitle>
        <CardDescription>
          선택된 저장소에 풀이가 저장됩니다. 원하는 저장소가 없는 경우 저장소를
          생성해보세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoaded && (
          <div className="flex flex-col space-y-6">
            {withLabel({
              labelId: 'selected-repository',
              labelName: '선택한 저장소',
              children: (
                <Select
                  onValueChange={selectRepository}
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
              children: <CreateRepository accessToken={accessToken} />,
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
