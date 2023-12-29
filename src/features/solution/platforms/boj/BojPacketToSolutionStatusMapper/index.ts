import type { PacketInterpreter } from '~/features/solution/solution-tracker/solution-catcher/types';
import { Process } from '~/features/solution/solution-tracker/types';
import type { BojPacket } from './types';

export default class BojPacketToSolutionStatusMapper
  implements PacketInterpreter
{
  async parse(packet: string) {
    const data = JSON.parse(packet) as Partial<BojPacket>;

    const { result, memory, time } = data;

    // 채점 진행중
    if (result === 3) {
      return {
        process: Process.SCORE,
        payload: {},
      };
    }

    // 채점 완료
    if (result === 4) {
      const searchParams = new URLSearchParams(location.search);
      const problemId = searchParams.get('problem_id');
      const title = await fetch(`https://www.acmicpc.net/problem/${problemId}`)
        .then((res) => res.text())
        .then((html) => {
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
    }

    if (result === 6) {
      return {
        process: Process.FAIL,
        payload: {},
      };
    }

    return undefined;
  }
}
