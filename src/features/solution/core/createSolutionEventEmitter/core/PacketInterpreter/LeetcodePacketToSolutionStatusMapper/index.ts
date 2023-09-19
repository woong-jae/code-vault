import type PacketInterpreter from '..';
import { Process, type SolutionStatus } from '../../../../types';

export default class LeetcodePacketToSolutionStatusMapper
  implements PacketInterpreter
{
  parse(packet: string): SolutionStatus | undefined {
    const data = JSON.parse(packet);

    if (data.status_code !== 10 || data.code_answer) return;

    return {
      process: Process.SUCCESS,
      payload: {
        time: parseInt(data.status_runtime.split(' ')[0]),
        memory: parseInt(data.status_memory.split(' ')[0]),
      },
    };
  }
}
