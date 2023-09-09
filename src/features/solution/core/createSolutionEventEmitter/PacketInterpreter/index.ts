import { SolutionStatus } from '../../types';

export default interface PacketInterpreter {
  parse(packet: string): SolutionStatus | undefined;
}
