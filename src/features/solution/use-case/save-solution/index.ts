import type { AccessToken } from '~/features/auth';
import saveContent from '~/features/user/use-case/save-content';
import { createMarkdown } from '../../domain/content/createMarkdown';
import { createMessage } from '../../domain/content/createMessage';
import { getFileExtension } from '../../domain/content/getFileExtension';
import type { Solution } from '../../types';

const saveSolution = async ({
  solution,
  accessToken,
}: {
  solution: Solution;
  accessToken: AccessToken;
}) => {
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
      saveContent({
        path: descriptionPath,
        message,
        content: description,
        accessToken,
      }),
      saveContent({
        path: codePath,
        content: solution.code,
        message,
        accessToken,
      }),
    ]);

    return !result.includes(false);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default saveSolution;
