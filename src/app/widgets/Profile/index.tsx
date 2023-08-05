import Card from '~/app/components/Card';

export default function Profile({
  login,
  avatar_url,
  name,
}: {
  login: string;
  avatar_url: string;
  name: string;
}) {
  return (
    <Card>
      <div class="flex items-center justify-center">
        <img class="h-52 w-52 rounded-full" src={avatar_url} />
      </div>
      <h2 class="mt-4 text-xl font-bold">{name}</h2>
      <div class="text-gray-600">{login}</div>
    </Card>
  );
}
