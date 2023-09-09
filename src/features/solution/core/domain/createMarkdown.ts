import { Solution } from '../types';

export type CreateMarkdown = (solution: Solution) => string;

export const createMarkdown: CreateMarkdown = (solution: Solution) => {
  const title = `# [${solution.platform}] ${solution.problemId}`;

  const codeSubtitle = '## Code';
  const code = `\`\`\`${solution.language}\n${solution.code}\n\`\`\``;

  return [title, codeSubtitle, code].join('\n');
};
