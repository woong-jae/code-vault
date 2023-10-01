import type { SaveSolution } from '../ports.input';
import type { Solution } from '../types';
import saveContent from '../../adaptor/saveContent';
import { createMarkdown } from '../domain/createMarkdown';
import { createMessage } from '../domain/createMessage';
import { getFileExtension } from '../domain/getFileExtension';

const saveSolution: SaveSolution = async (solution: Solution) => {
  const dir = `${solution.platform}/[${solution.problemId}] ${solution.title}`;
  const descriptionPath = `${dir}/README.md`;
  const codePath = `${dir}/${solution.problemId}.${getFileExtension(
    solution.language,
  )}`;

  const description = createMarkdown(solution);
  const message = createMessage(solution);

  try {
    const result = await Promise.all([
      saveContent(descriptionPath, description, message),
      saveContent(codePath, solution.code, message),
    ]);

    return !result.includes(false);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default saveSolution;
