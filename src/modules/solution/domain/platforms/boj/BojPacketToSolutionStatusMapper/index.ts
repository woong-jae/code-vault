import type { PacketInterpreter } from '~/modules/solution/infras/solution-tracker/solution-catcher/types';
import type { BojPacket } from './types';
import { Process } from '~/modules/solution/infras/solution-tracker/types';

export default class BojPacketToSolutionStatusMapper
  implements PacketInterpreter
{
  async parse(packet: string) {
    const data = JSON.parse(packet) as Partial<BojPacket>;

    const { result, memory, time } = data;

    switch (result) {
      case 3: // 채점 진행중
        return {
          process: Process.SCORE,
          payload: {},
        };
      case 4: // 채점 완료
        const searchParams = new URLSearchParams(location.search);
        const problemId = searchParams.get('problem_id');
        const title = await fetch(
          `https://www.acmicpc.net/problem/${problemId}`,
        )
          .then(res => res.text())
          .then(html => {
            const document = new DOMParser().parseFromString(html, 'text/html');
            return document.getElementById('problem_title')?.textContent;
          });

        if (!title) {
          throw new Error('[code-vault] Failed to parse title');
        }

        return {
          process: Process.SUCCESS,
          payload: {
            /* 백준은 KB */
            memory: memory ? memory / 1000 : 0,
            time,
            title,
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
