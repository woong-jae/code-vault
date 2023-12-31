import type { PacketInterpreter } from '~/features/solution/solution-tracker/solution-catcher/types';
import { Process } from '~/features/solution/solution-tracker/types';

export default class LeetcodePacketToSolutionStatusMapper
  implements PacketInterpreter
{
  async parse(packet: string) {
    const data = JSON.parse(packet);

    if (data.status_code !== 10 || data.code_answer) return;

    const titleKebabCase = location.pathname.split('/')[2];

    return {
      process: Process.SUCCESS,
      payload: {
        title: titleKebabCase,
        time: parseInt(data.status_runtime.split(' ')[0]),
        memory: parseInt(data.status_memory.split(' ')[0]),
      },
    };
  }
}
