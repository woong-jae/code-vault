import { Fragment } from 'react';
import getUserProfile from '../use-case/get-user-profile';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@base/ui/Card';
import { useQuery } from '@tanstack/react-query';

export default function UserProfile() {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  const loaded = !isLoading;

  return (
    <Card>
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
    </Card>
  );
}
