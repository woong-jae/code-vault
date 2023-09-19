import createEventBus from '~/shared/infrastructure/eventBus';
import type { CreateSolutionEventEmitter } from '../../../ports.input';
import ProgrammersPacketToSolutionStatusMapper from '../../core/PacketInterpreter/ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from '../../core/SolutionInterceptor/ProgrammersSolutionInterceptor';
import { initSolutionEventEmitter } from '../../initSolutionEventEmitter';

export const initProgrammersSolutionEventEmitter: CreateSolutionEventEmitter =
  () => {
    initSolutionEventEmitter({
      eventBus: createEventBus('world'),
      networkInterceptor: new ProgrammersSolutionInterceptor(),
      packetInterpreter: new ProgrammersPacketToSolutionStatusMapper(),
    });
  };
