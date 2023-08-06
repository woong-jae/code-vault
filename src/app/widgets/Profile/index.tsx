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
      <div class="w-56">
        <div class="flex items-center justify-center">
          <img class="rounded-full" src={avatar_url} />
        </div>
        <h2 class="mt-4 line-clamp-1 text-xl font-bold">{name}</h2>
        <div class="line-clamp-1 text-gray-600">{login}</div>
      </div>
    </Card>
  );
}
