import createEventBus from '~/_shared/infrastructure/eventBus';
import type { CreateSolutionEventEmitter } from '../../../ports.input';
import { Process, type SolutionStatus } from '../../../types';
import LeetcodeSolutionInterceptor from './LeetcodeSolutionInterceptor';
import LeetcodePacketToSolutionStatusMapper from './LeetcodePacketToSolutionStatusMapper';
import { initSolutionEventEmitter } from '../../initSolutionEventEmitter';

export const initLeetcodeSolutionEventEmitter: CreateSolutionEventEmitter =
  () => {
    initSolutionEventEmitter({
      eventBus: createEventBus('world'),
      networkInterceptor: new LeetcodeSolutionInterceptor(),
      packetInterpreter: new LeetcodePacketToSolutionStatusMapper(),
    });
  };

export const initLeetcodeSolutionEventEmitterFromBackground: CreateSolutionEventEmitter =
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
