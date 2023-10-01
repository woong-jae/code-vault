import type { Solution } from '../types';

export type CreateMarkdown = (solution: Solution) => string;

export const createMarkdown: CreateMarkdown = (solution: Solution) => {
  const title = `# [${solution.platform}] ${solution.problemId}`;

  const linkToProblem = `[문제 링크](${solution.link})`;

  const performanceSubtitle = '## 성능';
  const performance = [
    `- Time: ${solution.time}ms`,
    `- Memory: ${solution.memory}MB`,
  ].join('\n');

  return [title, linkToProblem, performanceSubtitle, performance].join('\n\n');
};
