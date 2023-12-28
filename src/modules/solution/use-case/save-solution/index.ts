import { User } from '~/modules/user';
import { createMarkdown } from '../../domain/content/createMarkdown';
import { createMessage } from '../../domain/content/createMessage';
import { getFileExtension } from '../../domain/content/getFileExtension';
import type { Solution } from '../../types';
import type { SaveSolution } from '../types';

const saveSolution: SaveSolution = async (solution: Solution) => {
  const dir =
    solution.platform === 'leetcode'
      ? `${solution.platform}/${solution.title}`
      : `${solution.platform}/[${solution.problemId}] ${solution.title}`;

  const descriptionPath = `${dir}/README.md`;
  const codePath = `${dir}/${
    solution.platform === 'leetcode' ? solution.title : solution.problemId
  }.${getFileExtension(solution.language)}`;

  const description = createMarkdown(solution);
  const message = createMessage(solution);

  try {
    const result = await Promise.all([
      User.saveContent(descriptionPath, description, message),
      User.saveContent(codePath, solution.code, message),
    ]);

    return !result.includes(false);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default saveSolution;
