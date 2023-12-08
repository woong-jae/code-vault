import LeetcodeSolutionInterceptor from './LeetcodeSolutionInterceptor';
import LeetcodePacketToSolutionStatusMapper from './LeetcodePacketToSolutionStatusMapper';
import type { CreateSolutionCatcher } from '~/modules/solution/infras/solution-tracker/solution-catcher/types';
import { initSolutionCatcher } from '~/modules/solution/infras/solution-tracker/solution-catcher/initSolutionCatcher';
import createEventBus from '~/shared/infras/event-bus';
import {
  Process,
  type SolutionStatus,
} from '~/modules/solution/infras/solution-tracker/types';

export const initLeetcodeSolutionCatcher: CreateSolutionCatcher = () => {
  initSolutionCatcher({
    eventBus: createEventBus('world'),
    networkInterceptor: new LeetcodeSolutionInterceptor(),
    packetInterpreter: new LeetcodePacketToSolutionStatusMapper(),
  });
};

export const initLeetcodeSolutionSolutionCatcherFromBackground: CreateSolutionCatcher =
  () => {
    const eventBus = createEventBus('background');
    chrome.webRequest.onBeforeRequest.addListener(
      details => {
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
              language: lang,
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
