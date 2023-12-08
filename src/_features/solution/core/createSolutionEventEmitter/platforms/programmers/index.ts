import createEventBus from '~/_shared/infrastructure/eventBus';
import type { CreateSolutionEventEmitter } from '../../../ports.input';
import ProgrammersPacketToSolutionStatusMapper from './ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from './ProgrammersSolutionInterceptor';
import { initSolutionEventEmitter } from '../../initSolutionEventEmitter';

export const initProgrammersSolutionEventEmitter: CreateSolutionEventEmitter =
  () => {
    initSolutionEventEmitter({
      eventBus: createEventBus('world'),
      networkInterceptor: new ProgrammersSolutionInterceptor(),
      packetInterpreter: new ProgrammersPacketToSolutionStatusMapper(),
    });
  };
