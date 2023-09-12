import { type CreateSolutionEventEmitter } from '../ports.input';
import { type Platform } from '../types';
import { type EventBus } from '~/shared/kernel';
import type PacketInterpreter from './PacketInterpreter';
import createEventBus from '~/services/eventBus';
import EventTypes from '~/services/eventBus/EventTypes';
import ProgrammersPacketToSolutionStatusMapper from './PacketInterpreter/ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from './SolutionInterceptor/ProgrammersSolutionInterceptor';
import BaseSolutionInterceptor from './SolutionInterceptor/BaseSolutionInterceptor';

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
      type: EventTypes.SOLUTION_INTERCEPTED,
      payload: JSON.stringify(parsedPacket),
    });
  });
}

const createSolutionEventEmitter: CreateSolutionEventEmitter = (
  platform: Platform,
) => {
  const eventBus = createEventBus('world');

  if (platform === 'programmers') {
    initSolutionEventEmitter({
      eventBus,
      networkInterceptor: new ProgrammersSolutionInterceptor(),
      packetInterpreter: new ProgrammersPacketToSolutionStatusMapper(),
    });
  }
};

export default createSolutionEventEmitter;
