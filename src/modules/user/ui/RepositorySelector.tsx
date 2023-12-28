import getRepositories from '../use-case/get-repositories';
import getSelectedRepository from '../use-case/get-selected-repository';
import setSelectedRepository from '../use-case/set-selected-repository';
import { useUserStore } from '../infra/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@base/ui/Card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@base/ui/Select';
import { ScrollArea } from '@base/ui/ScrollArea';
import { useQuery } from '@tanstack/react-query';

export default function RepositorySelector() {
  const { data: repositories, isLoading: isLoadingRepositories } = useQuery({
    queryKey: ['repositories'],
    queryFn: getRepositories,
  });
  const { isLoading: isLoadingSelectedRepository } = useQuery({
    queryKey: ['selectedRepository'],
    queryFn: getSelectedRepository,
  });
  const loaded = !isLoadingRepositories && !isLoadingSelectedRepository;

  const selectedRepository = useUserStore((user) => user.selectedRepository);

  function handleSelectChange(value: string) {
    setSelectedRepository(value);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repository</CardTitle>
        <CardDescription>선택한 저장소</CardDescription>
      </CardHeader>
      <CardContent>
        {loaded && (
          <Select
            onValueChange={handleSelectChange}
            value={selectedRepository || undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="저장소를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <ScrollArea>
                  {repositories?.map((repositoryName) => (
                    <SelectItem key={repositoryName} value={repositoryName}>
                      {repositoryName}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </CardContent>
    </Card>
  );
}
