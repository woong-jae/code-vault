import { SaveContentAdaptor } from '../../core/ports.output';
import { saveContent as callFeature } from '~/features/user';

const saveContent: SaveContentAdaptor = async (
  path: string,
  content: string,
  message: string,
) => {
  return callFeature(path, content, message);
};

export default saveContent;
