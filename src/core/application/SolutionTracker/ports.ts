import { SolutionInterceptListener } from './types';

export interface SolutionInterceptor {
  onIntercept(callback: SolutionInterceptListener): void;
}
