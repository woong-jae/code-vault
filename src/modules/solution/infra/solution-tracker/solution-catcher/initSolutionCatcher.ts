import type BaseSolutionInterceptor from './BaseSolutionInterceptor';
import type { PacketInterpreter } from './types';

type Dependencies = {
  eventBus: EventBus;
  networkInterceptor: BaseSolutionInterceptor;
  packetInterpreter: PacketInterpreter;
};

export function initSolutionCatcher({
  eventBus,
  networkInterceptor,
  packetInterpreter,
}: Dependencies) {
  networkInterceptor.onIntercept(async (packet) => {
    if (!packet) return;

    const parsedPacket = await packetInterpreter.parse(packet);
    if (!parsedPacket) return;

    eventBus.emit({
      type: 'SOLUTION_INTERCEPTED',
      payload: JSON.stringify(parsedPacket),
    });
  });
}
