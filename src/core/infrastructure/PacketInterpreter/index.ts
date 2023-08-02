import { SolutionStatus } from '~/core/application/SolutionTracker/types';

export default interface PacketInterpreter {
  parse(packet: string): SolutionStatus | undefined;
}
