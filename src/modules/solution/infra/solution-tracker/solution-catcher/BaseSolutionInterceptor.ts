import type { InterceptListener } from './types';

export default abstract class BaseSolutionInterceptor {
  protected interceptListeners: InterceptListener[] = [];

  onIntercept(callback: InterceptListener): void {
    this.interceptListeners.push(callback);
  }

  protected notify(interceptedPacket: string): void {
    this.interceptListeners.forEach((listener) => listener(interceptedPacket));
  }
}
