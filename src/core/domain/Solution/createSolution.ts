import { z } from 'zod';
import Solution from '.';

export default function createSolution({
  problemId,
  platform,
  code,
  language,
  date,
}: {
  problemId: string;
  platform: string;
  code: string;
  language: string;
  date?: Date;
}): z.infer<typeof Solution> {
  return Solution.parse({
    problemId,
    platform,
    code,
    language,
    date: date ?? new Date(),
  });
}
