import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@base/components/Card';
import { Label } from '@base/components/Label';
import { ScrollArea } from '@base/components/ScrollArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@base/components/Select';
import {
  getSelectedRepository,
  retrieveRepositories,
  setSelectedRepository,
} from '../repository';

export default function RepositorySelector({
  accessToken,
}: {
  accessToken: AccessToken;
}) {
  const { data: repositories, isLoading: isLoadingRepositories } = useQuery({
    queryKey: [accessToken, 'repositories'],
    queryFn: () => retrieveRepositories(accessToken),
  });
  const { data: selectedRepository, isLoading: isLoadingSelectedRepository } =
    useQuery({
      queryKey: ['selectedRepository'],
      queryFn: getSelectedRepository,
    });
  const loaded = !isLoadingRepositories && !isLoadingSelectedRepository;

  function handleSelectChange(value: string) {
    setSelectedRepository(value);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>저장소 설정</CardTitle>
        <CardDescription>선택된 저장소에 풀이가 저장됩니다.</CardDescription>
      </CardHeader>
      <CardContent>
        {loaded && (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="selected-repository">선택한 저장소</Label>
            <Select
              onValueChange={handleSelectChange}
              value={selectedRepository || undefined}
            >
              <SelectTrigger id="selected-repository">
                <SelectValue placeholder="저장소를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <ScrollArea className="h-[200px]">
                    {repositories?.map((repositoryName) => (
                      <SelectItem key={repositoryName} value={repositoryName}>
                        {repositoryName}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
