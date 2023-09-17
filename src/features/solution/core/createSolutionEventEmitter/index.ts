import { type CreateSolutionEventEmitter } from '../ports.input';
import { Process, type SolutionStatus } from '../types';
import { type EventBus } from '~/shared/kernel';
import type PacketInterpreter from './PacketInterpreter';
import createEventBus from '~/shared/infrastructure/eventBus';
import ProgrammersPacketToSolutionStatusMapper from './PacketInterpreter/ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from './SolutionInterceptor/ProgrammersSolutionInterceptor';
import BaseSolutionInterceptor from './SolutionInterceptor/BaseSolutionInterceptor';
import BojSolutionInterceptor from './SolutionInterceptor/BojSolutionInterceptor';
import BojPacketToSolutionStatusMapper from './PacketInterpreter/BojPacketToSolutionStatusMapper';
import parseBojLanguage from './parseBojLanguage';

type Dependencies = {
  eventBus: EventBus;
  networkInterceptor: BaseSolutionInterceptor;
  packetInterpreter: PacketInterpreter;
};

function initSolutionEventEmitter({
  eventBus,
  networkInterceptor,
  packetInterpreter,
}: Dependencies) {
  networkInterceptor.onIntercept(packet => {
    if (!packet) return;

    const parsedPacket = packetInterpreter.parse(packet);
    if (!parsedPacket) return;

    eventBus.emit({
      type: 'SOLUTION_INTERCEPTED',
      payload: JSON.stringify(parsedPacket),
    });
  });
}

export const initProgrammersSolutionEventEmitter: CreateSolutionEventEmitter =
  () => {
    initSolutionEventEmitter({
      eventBus: createEventBus('world'),
      networkInterceptor: new ProgrammersSolutionInterceptor(),
      packetInterpreter: new ProgrammersPacketToSolutionStatusMapper(),
    });
  };

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
