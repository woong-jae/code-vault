import ProgrammersPacketToSolutionStatusMapper from './ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from './ProgrammersSolutionInterceptor';
import type { CreateSolutionCatcher } from '~/modules/solution/infra/solution-tracker/solution-catcher/types';
import { initSolutionCatcher } from '~/modules/solution/infra/solution-tracker/solution-catcher/initSolutionCatcher';
import createEventBus from '@base/infra/event-bus';

export const initProgrammersSolutionCatcher: CreateSolutionCatcher = () => {
  initSolutionCatcher({
    eventBus: createEventBus('world'),
    networkInterceptor: new ProgrammersSolutionInterceptor(),
    packetInterpreter: new ProgrammersPacketToSolutionStatusMapper(),
  });
};
