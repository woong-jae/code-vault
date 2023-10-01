import type { SolutionStatus } from '../../../types';

export default interface PacketInterpreter {
  parse(packet: string): Promise<SolutionStatus | undefined>;
}
