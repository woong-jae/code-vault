import {
  retrieveSelectedRepository,
  persistContent,
} from '../../infra/persistence';

const saveContent = async ({
  path,
  content,
  message,
  accessToken,
}: {
  path: string;
  content: string;
  message: string;
  accessToken: AccessToken;
}) => {
  const selectedRepositoryName = await retrieveSelectedRepository();

  if (!accessToken || !selectedRepositoryName) return false;

  return persistContent({
    accessToken,
    repositoryName: selectedRepositoryName,
    path,
    content,
    message,
  });
};

export default saveContent;
