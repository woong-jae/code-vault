import createEventBus from '~/_shared/infrastructure/eventBus';
import ProgrammersPacketToSolutionStatusMapper from './ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from './ProgrammersSolutionInterceptor';
import type { CreateSolutionCatcher } from '~/modules/solution/infras/solution-tracker/solution-catcher/types';
import { initSolutionCatcher } from '~/modules/solution/infras/solution-tracker/solution-catcher/initSolutionCatcher';

export const initProgrammersSolutionCatcher: CreateSolutionCatcher =
  () => {
    initSolutionCatcher({
      eventBus: createEventBus('world'),
      networkInterceptor: new ProgrammersSolutionInterceptor(),
      packetInterpreter: new ProgrammersPacketToSolutionStatusMapper(),
    });
  };
