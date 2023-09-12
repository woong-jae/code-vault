import { Fragment } from 'react';
import { asQuery } from '~/shared/infrastructure/cqs';
import { Button } from '~/shared/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/shared/ui/Card';
import getUserProfile from '../../core/getUserProfile';
import logout from '../../core/logout';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '~/shared/ui/AlertDialog';

const useUserProfile = asQuery(getUserProfile);

export default function UserProfile() {
  const { data: userProfile, isLoading } = useUserProfile();

  const loaded = !isLoading;

  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>유저 프로필</CardDescription>
      </CardHeader>
      <CardContent>
        {loaded && (
          <Fragment>
            <img className="rounded-full" src={userProfile?.avatarUrl} />
            <div className="mt-2">
              <p className="text-sm">Name</p>
              <p className="line-clamp-1 rounded-sm border px-2 py-1 text-base text-neutral-700">
                {userProfile?.id}
              </p>
            </div>
          </Fragment>
        )}
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full" variant={'destructive'}>
              로그아웃
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말 로그아웃 하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                선택된 저장소가 초기화되고 자동으로 풀이를 업로드 할 수
                없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={logout}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
