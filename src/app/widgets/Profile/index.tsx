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
      <img src={avatar_url} />
      <div>{login}</div>
      <div>{name}</div>
    </Card>
  );
}
