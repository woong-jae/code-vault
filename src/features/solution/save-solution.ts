import { persistContent } from '../user';
import { createMarkdown } from './content/createMarkdown';
import { createMessage } from './content/createMessage';
import { getFileExtension } from './content/getFileExtension';
import type { Solution } from './types';

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

  return persistContent({
    accessToken,
    message,
    contents: [
      {
        path: descriptionPath,
        content: description,
      },
      {
        path: codePath,
        content: solution.code,
      },
    ],
  });
};

export { saveSolution };
