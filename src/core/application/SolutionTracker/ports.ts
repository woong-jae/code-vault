import { InterceptListener, SolutionStatus } from './types';

export interface NetworkInterceptor {
  onIntercept(callback: InterceptListener): void;
}

export interface PacketInterpreter {
  parse(packet: string): SolutionStatus | undefined;
}
