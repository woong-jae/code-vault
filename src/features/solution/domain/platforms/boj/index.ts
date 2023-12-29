import createEventBus from '@base/infra/event-bus';
import { initSolutionCatcher } from '~/features/solution/infra/solution-tracker/solution-catcher/initSolutionCatcher';
import type { CreateSolutionCatcher } from '~/features/solution/infra/solution-tracker/solution-catcher/types';
import {
  Process,
  type SolutionStatus,
} from '~/features/solution/infra/solution-tracker/types';
import BojPacketToSolutionStatusMapper from './BojPacketToSolutionStatusMapper';
import BojSolutionInterceptor from './BojSolutionInterceptor';
import parseBojLanguage from './parseBojLanguage';

export const initBojSolutionCatcherFromWorld: CreateSolutionCatcher = () => {
  initSolutionCatcher({
    eventBus: createEventBus('world'),
    networkInterceptor: new BojSolutionInterceptor(),
    packetInterpreter: new BojPacketToSolutionStatusMapper(),
  });
};

export const initBojSolutionCatcherFromBackground: CreateSolutionCatcher =
  () => {
    const eventBus = createEventBus('background');
    chrome.webRequest.onBeforeRequest.addListener(
      ({ method, requestBody }) => {
        if (method === 'GET' || requestBody?.formData === undefined) return;
        const { formData } = requestBody;

        const code = formData.source[0];
        const problemId = formData.problem_id[0];
        const language = formData.language[0];

        eventBus.emit({
          type: 'SOLUTION_INTERCEPTED',
          payload: JSON.stringify({
            process: Process.START,
            payload: {
              link: `https://www.acmicpc.net/problem/${problemId}`,
              platform: 'boj',
              code,
              problemId,
              language: parseBojLanguage(language),
            },
          } as SolutionStatus),
        });
      },
      {
        urls: ['https://www.acmicpc.net/submit/*'],
      },
      ['requestBody'],
    );
  };
