import createEventBus from '~/base/infra/event-bus';
import { initSolutionCatcher } from '~/features/solution/solution-tracker/solution-catcher/initSolutionCatcher';
import type { CreateSolutionCatcher } from '~/features/solution/solution-tracker/solution-catcher/types';
import {
  Process,
  type SolutionStatus,
} from '~/features/solution/solution-tracker/types';
import { ProgrammingLanguageEnum } from '../../programming-language';
import LeetcodePacketToSolutionStatusMapper from './LeetcodePacketToSolutionStatusMapper';
import LeetcodeSolutionInterceptor from './LeetcodeSolutionInterceptor';

export const initLeetcodeSolutionCatcher: CreateSolutionCatcher = () => {
  initSolutionCatcher({
    eventBus: createEventBus('world'),
    networkInterceptor: new LeetcodeSolutionInterceptor(),
    packetInterpreter: new LeetcodePacketToSolutionStatusMapper(),
  });
};

export const initLeetcodeSolutionCatcherFromBackground: CreateSolutionCatcher =
  () => {
    const eventBus = createEventBus('background');
    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (details.method !== 'POST') return;

        if (!details.requestBody?.raw) return;

        const body = new TextDecoder().decode(
          details.requestBody?.raw[0].bytes,
        );
        const { lang, question_id, typed_code } = JSON.parse(body);

        eventBus.emit({
          type: 'SOLUTION_INTERCEPTED',
          payload: JSON.stringify({
            process: Process.START,
            payload: {
              link: details.url.split('/').slice(0, -2).join('/'),
              platform: 'leetcode',
              language: ProgrammingLanguageEnum.parse(lang),
              problemId: question_id,
              code: typed_code,
            },
          } as SolutionStatus),
        });
      },
      {
        urls: ['https://leetcode.com/problems/*'],
      },
      ['requestBody'],
    );
  };
