import { InterceptListener } from './types';

export default interface SolutionInterceptor {
  onIntercept(callback: InterceptListener): void;
}
