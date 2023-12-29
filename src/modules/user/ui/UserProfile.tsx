import { Fragment } from 'react';
import getUserProfile from '../use-case/get-user-profile';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@base/ui/Avatar';
import Typography from '@base/ui/Typography';

export default function UserProfile() {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  const loaded = !isLoading;

  return (
    <div>
      {loaded && (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={userProfile?.avatarUrl} />
            <AvatarFallback>{userProfile?.id.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <p className='text-sm'>{`안녕하세요, ${userProfile?.id}님`}</p>
        </div>
      )}
    </div>
  );
}
