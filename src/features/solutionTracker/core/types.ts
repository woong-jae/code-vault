import { z } from 'zod';
import Solution, { Platform, ProgrammingLanguage } from './domain/Solution';

export type Solution = z.infer<typeof Solution>;
export type Platform = z.infer<typeof Platform>;
export type ProgrammingLanguage = z.infer<typeof ProgrammingLanguage>;
