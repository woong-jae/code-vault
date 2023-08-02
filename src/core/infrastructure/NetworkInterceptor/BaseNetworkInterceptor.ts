import { InterceptListener } from './types';

export default abstract class BaseNetworkInterceptor {
  protected interceptListeners: InterceptListener[] = [];

  onIntercept(callback: InterceptListener): void {
    this.interceptListeners.push(callback);
  }

  protected notify(interceptedPacket: string): void {
    this.interceptListeners.forEach(listener => listener(interceptedPacket));
  }
}
