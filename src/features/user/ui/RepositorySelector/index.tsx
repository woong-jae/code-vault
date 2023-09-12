import { asQuery } from '~/shared/infrastructure/cqs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '~/shared/ui/Card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '~/shared/ui/Select';
import getRepositories from '../../core/getRepositories';
import { useSelectedRepository } from '../../infrastructure/store';
import getSelectedRepository from '../../core/getSelectedRepository';
import setSelectedRepository from '../../core/setSelectedRepository';
import { ScrollArea } from '~/shared/ui/ScrollArea';

const useRepositories = asQuery(getRepositories);
const useSelectedRepositoryQuery = asQuery(getSelectedRepository);

export default function RepositorySelector() {
  const { data: repositories, isLoading: isLoadingRepositories } =
    useRepositories();
  const { isLoading: isLoadingSelectedRepository } =
    useSelectedRepositoryQuery();
  const selectedRepository = useSelectedRepository();

  const loaded = !isLoadingRepositories && !isLoadingSelectedRepository;

  function handleSelectChange(value: string) {
    setSelectedRepository(value);
  }

  return (
    <Card className="h-min w-[350px]">
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
                <ScrollArea className="h-72">
                  {repositories?.map(repositoryName => (
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
      <CardFooter />
    </Card>
  );
}
