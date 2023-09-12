import type { SaveSolution } from '../ports.input';
import type { Solution } from '../types';
import saveContent from '../../adaptor/saveContent';
import { createMarkdown } from '../domain/createMarkdown';
import { createMessage } from '../domain/createMessage';
import { getFileExtension } from '../domain/getFileExtension';

const saveSolution: SaveSolution = async (solution: Solution) => {
  const descriptionPath = `${solution.platform}/${solution.problemId}/README.md`;
  const codePath = `${solution.platform}/${solution.problemId}/${
    solution.problemId
  }.${getFileExtension(solution.language)}`;
  const description = createMarkdown(solution);
  const message = createMessage(solution);

  return Promise.all([
    saveContent(descriptionPath, description, message),
    saveContent(codePath, solution.code, message),
  ])
    .then(() => true)
    .catch(() => false);
};

export default saveSolution;
