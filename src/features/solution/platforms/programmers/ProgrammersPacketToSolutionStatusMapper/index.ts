import {
  ProgrammingLanguageEnum,
  type ProgrammingLanguage,
} from '~/features/solution/programming-language';
import { Process } from '~/features/solution/solution-tracker/types';
import type { Solution } from '../../../types';
import {
  type ProgrammersCode,
  type ProgrammersIdentifier,
  type ProgrammersPacket,
} from './types';
import PacketInterpreter from '.';

export default class ProgrammersPacketToSolutionStatusMapper
  implements PacketInterpreter
{
  private readonly platform = 'programmers';
  // private messageRegex = /\d+\.?\d+/g;

  async parse(packet: string) {
    const programmersPacket = JSON.parse(packet) as ProgrammersPacket;
    const process = this.parseProcess(programmersPacket);
    if (!process) return;

    return {
      process,
      payload: this.parsePayload(process, programmersPacket),
    };
  }

  private parseProcess(
    programmersPacket: ProgrammersPacket,
  ): Process | undefined {
    if (programmersPacket?.command) return Process.START;
    if (programmersPacket?.message) {
      const { type, passed } = programmersPacket.message;
      if (type === 'testcase') return Process.SCORE;
      if (type === 'result_lesson_challenge') {
        return passed ? Process.SUCCESS : Process.FAIL;
      }
    }
    return undefined;
  }

  private parsePayload(
    process: Process,
    programmersPacket: ProgrammersPacket,
  ): Partial<Solution> {
    if (process === Process.START) {
      // 문제 아이디와 언어 추출
      if (programmersPacket?.identifier === undefined) return {};
      const identifier = JSON.parse(
        programmersPacket.identifier,
      ) as ProgrammersIdentifier;
      const { lesson_id: problemId, language } = identifier;

      // 코드 추출
      if (programmersPacket?.data === undefined) return {};
      const { codes } = JSON.parse(programmersPacket.data) as ProgrammersCode;
      const key = Object.keys(codes)[0];
      const code = codes[key];

      const $title = document.querySelector('.algorithm-title') as HTMLElement;

      return {
        title: $title.textContent?.trim(),
        platform: this.platform,
        problemId: problemId.toString(),
        code,
        language: this.parseLanguage(language),
        link: `https://school.programmers.co.kr/learn/courses/30/lessons/${problemId}`,
      };
    }

    if (process === Process.SCORE) {
      if (programmersPacket?.message === undefined) return {};
      const { passed, msg } = programmersPacket.message;
      if (passed) {
        const [timeMatch, memoryMatch] = msg.matchAll(/\d+\.?\d+/g);

        return {
          time: parseFloat(timeMatch[0]),
          memory: parseFloat(memoryMatch[0]),
        };
      }

      return {
        time: 0,
        memory: 0,
      };
    }

    return {};
  }

  private parseLanguage(language: string): ProgrammingLanguage {
    if (language.includes('python')) {
      return 'python';
    }
    return ProgrammingLanguageEnum.parse(language);
  }
}
