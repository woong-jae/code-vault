import { Button } from '~/shared/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/shared/ui/Card';

export default function UserProfile() {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>유저 프로필</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/33976823?v=4"
        />
        <div className="mt-2">
          <p className="text-sm">Name</p>
          <p className="line-clamp-1 rounded-sm border px-2 py-1">woong-jae</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={'destructive'}>
          로그아웃
        </Button>
      </CardFooter>
    </Card>
  );
}
