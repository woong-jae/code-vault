import type PacketInterpreter from '..';
import { Process, type SolutionStatus } from '../../../../types';
import type { BojPacket } from './types';

export default class BojPacketToSolutionStatusMapper
  implements PacketInterpreter
{
  parse(packet: string): SolutionStatus | undefined {
    const data = JSON.parse(packet) as Partial<BojPacket>;

    const { result, memory, time } = data;

    switch (result) {
      case 3: // 채점 진행중
        return {
          process: Process.SCORE,
          payload: {},
        };
      case 4: // 채점 완료
        return {
          process: Process.SUCCESS,
          payload: {
            memory,
            time,
          },
        };
      case 6: // 실패
        return {
          process: Process.FAIL,
          payload: {},
        };
      default:
        return undefined;
    }
  }
}
