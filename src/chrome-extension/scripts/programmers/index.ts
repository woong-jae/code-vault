import createEventHub from '~/chrome-extension/common/createEventHub';
import ProgrammersPacketToSolutionStatusMapper from '~/features/SolutionTracker/infrastructure/PacketInterpreter/ProgrammersPacketToSolutionStatusMapper';
import ProgrammersSolutionInterceptor from '~/features/solutionTracker/infrastructure/SolutionInterceptor/ProgrammersSolutionInterceptor';

console.log('CodeVault loaded...');

const eventHub = createEventHub('world', window);
eventHub.listen(({ type, payload }) => {
  if (type !== 'solved') return;
  if (payload) console.log(JSON.parse(payload));
});

const networkInterceptor = new ProgrammersSolutionInterceptor();
const packetParser = new ProgrammersPacketToSolutionStatusMapper();

networkInterceptor.onIntercept(packet => {
  if (!packet) return;

  const parsedPacket = packetParser.parse(packet);
  if (!parsedPacket) return;

  eventHub.emit({
    type: 'solution',
    payload: JSON.stringify(parsedPacket),
  });
});
