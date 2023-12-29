import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@base/components/Avatar';
import { retrieveUserProfile } from '../profile';

export default function UserProfile({
  accessToken,
}: {
  accessToken: AccessToken;
}) {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: [accessToken, 'userProfile'],
    queryFn: () => retrieveUserProfile(accessToken),
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
          <p className="text-sm">{`안녕하세요, ${userProfile?.id}님`}</p>
        </div>
      )}
    </div>
  );
}
