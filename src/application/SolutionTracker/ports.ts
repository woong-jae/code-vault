import Solution from '~/domain/Solution';
import { InterceptListener } from './types';

export interface SolutionArchive {
  save(solution: Solution): Promise<boolean>;
}

export interface SolutionInterceptor {
  onIntercept(callback: InterceptListener): void;
}
