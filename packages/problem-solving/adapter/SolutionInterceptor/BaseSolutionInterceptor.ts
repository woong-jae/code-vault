import { SolutionInterceptor } from '~/application/SolutionTracker/ports';
import { InterceptListener } from '~/application/SolutionTracker/types';

export default abstract class BaseSolutionInterceptor
  implements SolutionInterceptor
{
  private interceptListeners: InterceptListener[] = [];

  onIntercept(callback: InterceptListener): void {
    this.interceptListeners.push(callback);
  }
}
