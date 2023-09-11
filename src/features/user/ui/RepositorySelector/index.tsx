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

export default function RepositorySelector() {
  return (
    <Card className="h-min w-[350px]">
      <CardHeader>
        <CardTitle>Repository</CardTitle>
        <CardDescription>선택한 저장소</CardDescription>
      </CardHeader>
      <CardContent>
        <Select defaultValue="apple">
          <SelectTrigger>
            <SelectValue placeholder="저장소를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
