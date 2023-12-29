import type { SolutionStatus } from '../types';

export type InterceptListener = (packet: string) => void;

export interface PacketInterpreter {
  parse(packet: string): Promise<SolutionStatus | undefined>;
}

export type CreateSolutionCatcher = () => void;
