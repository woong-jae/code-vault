import { SolutionStatus } from '~/features/solutionTracker/core/SolutionTracker/types';

export default interface PacketInterpreter {
  parse(packet: string): SolutionStatus | undefined;
}
