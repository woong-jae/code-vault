import type { EventBus } from '~/shared/kernel';
import type PacketInterpreter from './core/PacketInterpreter';
import type BaseSolutionInterceptor from './core/SolutionInterceptor/BaseSolutionInterceptor';

type Dependencies = {
  eventBus: EventBus;
  networkInterceptor: BaseSolutionInterceptor;
  packetInterpreter: PacketInterpreter;
};

export function initSolutionEventEmitter({
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
