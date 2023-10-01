import createEventBus from '~/shared/infrastructure/eventBus';
import type { CreateSolutionEventEmitter } from '../../../ports.input';
import { Process, type SolutionStatus } from '../../../types';
import BojPacketToSolutionStatusMapper from './BojPacketToSolutionStatusMapper';
import BojSolutionInterceptor from './BojSolutionInterceptor';
import { initSolutionEventEmitter } from '../../initSolutionEventEmitter';
import parseBojLanguage from './parseBojLanguage';

export const initBojSolutionEventEmitterFromWorld: CreateSolutionEventEmitter =
  () => {
    initSolutionEventEmitter({
      eventBus: createEventBus('world'),
      networkInterceptor: new BojSolutionInterceptor(),
      packetInterpreter: new BojPacketToSolutionStatusMapper(),
    });
  };

export const initBojSolutionEventEmitterFromBackground: CreateSolutionEventEmitter =
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
