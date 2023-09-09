import { CreateSolutionEventEmitter } from '../ports.input';
import { Platform } from '../types';
import createEventBus from '~/services/eventBus';
import EventTypes from '~/services/eventBus/EventTypes';
import ProgrammersPacketToSolutionStatusMapper from './PacketInterpreter/ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from './SolutionInterceptor/ProgrammersSolutionInterceptor';

const createSolutionEventEmitter: CreateSolutionEventEmitter = (
  platform: Platform,
) => {
  if (platform === 'programmers') {
    const eventHub = createEventBus('world');
    eventHub.listen(({ type, payload }) => {
      if (type === EventTypes.CONFIRM_REQUEST) {
        if (payload) console.log(JSON.parse(payload));
      }
    });

    const networkInterceptor = new ProgrammersSolutionInterceptor();
    const packetParser = new ProgrammersPacketToSolutionStatusMapper();

    networkInterceptor.onIntercept(packet => {
      if (!packet) return;

      const parsedPacket = packetParser.parse(packet);
      if (!parsedPacket) return;

      eventHub.emit({
        type: EventTypes.SOLUTION_INTERCEPTED,
        payload: JSON.stringify(parsedPacket),
      });
    });
  }

  throw new Error(`${platform} not yet supported`);
};

export default createSolutionEventEmitter;
