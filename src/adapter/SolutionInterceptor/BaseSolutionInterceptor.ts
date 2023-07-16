import { SolutionInterceptor } from '~/application/SolutionTracker/ports';
import {
  InterceptListener,
  InterceptedData,
} from '~/application/SolutionTracker/types';

export default abstract class BaseSolutionInterceptor
  implements SolutionInterceptor
{
  protected interceptListeners: InterceptListener[] = [];

  onIntercept(callback: InterceptListener): void {
    this.interceptListeners.push(callback);
  }

  protected notify(interceptedData: InterceptedData) {
    this.interceptListeners.forEach(listener => listener(interceptedData));
  }
}
