import { NetworkInterceptor } from '~/core/application/SolutionTracker/ports';
import { InterceptListener } from '~/core/application/SolutionTracker/types';

export default abstract class BaseNetworkInterceptor
  implements NetworkInterceptor
{
  protected interceptListeners: InterceptListener[] = [];

  onIntercept(callback: InterceptListener): void {
    this.interceptListeners.push(callback);
  }

  protected notify(interceptedPacket: string): void {
    this.interceptListeners.forEach(listener => listener(interceptedPacket));
  }
}