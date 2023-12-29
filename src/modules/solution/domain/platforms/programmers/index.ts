import createEventBus from '@base/infra/event-bus';
import { initSolutionCatcher } from '~/modules/solution/infra/solution-tracker/solution-catcher/initSolutionCatcher';
import type { CreateSolutionCatcher } from '~/modules/solution/infra/solution-tracker/solution-catcher/types';
import ProgrammersPacketToSolutionStatusMapper from './ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from './ProgrammersSolutionInterceptor';

export const initProgrammersSolutionCatcher: CreateSolutionCatcher = () => {
  initSolutionCatcher({
    eventBus: createEventBus('world'),
    networkInterceptor: new ProgrammersSolutionInterceptor(),
    packetInterpreter: new ProgrammersPacketToSolutionStatusMapper(),
  });
};
