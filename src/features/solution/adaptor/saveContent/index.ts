import { SaveContentAdaptor } from '../../core/ports.output';
import callFeature from '~/features/user/core/saveContent';

const saveContent: SaveContentAdaptor = async (
  path: string,
  content: string,
  message: string,
) => {
  return callFeature(path, content, message);
};

export default saveContent;
