import type { Solution } from '../types';

export type CreateMarkdown = (solution: Solution) => string;

export const createMarkdown: CreateMarkdown = (solution: Solution) => {
  const title =
    solution.platform === 'leetcode'
      ? `# ${solution.title
          .split('-')
          .map((text) => `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`)
          .join(' ')}`
      : `# [${solution.problemId}] ${solution.title}`;

  const linkToProblem = `[문제 출처](${solution.link})`;

  const performanceSubtitle = '## 성능';
  const performance = [
    `- Time: ${solution.time}ms`,
    `- Memory: ${solution.memory}MB`,
  ].join('\n');

  return [title, linkToProblem, performanceSubtitle, performance].join('\n\n');
};
