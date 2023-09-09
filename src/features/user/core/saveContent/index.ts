import {
  persistContent,
  retrieveRepositoryToken,
  retrieveSelectedRepository,
} from '../../infrastructure/persistence';
import { SaveContent } from '../ports.input';

const saveContent: SaveContent = async (path, content, message) => {
  const repositoryToken = await retrieveRepositoryToken();
  const selectedRepositoryName = await retrieveSelectedRepository();

  if (!repositoryToken || !selectedRepositoryName) return false;

  return persistContent({
    repositoryToken,
    repositoryName: selectedRepositoryName,
    path,
    content,
    message,
  });
};

export default saveContent;
