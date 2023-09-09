import { SaveSolution } from '../ports.input';
import { Solution } from '../types';
import saveContent from '../../adaptor/saveContent';
import { createMarkdown } from '../domain/createMarkdown';
import { createMessage } from '../domain/createMessage';
import { getFileExtension } from '../domain/getFileExtension';

const saveSolution: SaveSolution = async (solution: Solution) => {
  const path = `/${solution.platform}/${solution.problemId}.${getFileExtension(
    solution.language,
  )}`;
  const content = createMarkdown(solution);
  const message = createMessage(solution);

  return saveContent(path, content, message);
};

export default saveSolution;
