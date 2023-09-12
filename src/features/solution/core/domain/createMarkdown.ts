import type { Solution } from '../types';

export type CreateMarkdown = (solution: Solution) => string;

export const createMarkdown: CreateMarkdown = (solution: Solution) => {
  const title = `# [${solution.platform}] ${solution.problemId}`;

  const performanceSubtitle = '## 성능';
  const performance = `Time: ${solution.time}ms, Memory: ${solution.memory}MB`;

  return [title, performanceSubtitle, performance].join('\n\n');
};
