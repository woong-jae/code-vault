import renderApp from '~/app/renderController';
import { setAppState } from '~/app/signals/appState';
import createEventHub from '~/chrome-extension/common/createEventHub';
import ProgrammersSolutionInterceptor from '~/core/infrastructure/NetworkInterceptor/ProgrammersSolutionInterceptor';
import ProgrammersPacketToSolutionStatusMapper from '~/core/infrastructure/PacketInterpreter/ProgrammersPacketToSolutionStatusMapper';

console.log('CodeVault loaded...');

renderApp();

const eventHub = createEventHub('world', window);
eventHub.listen(({ type }) => {
  if (type === 'needSetting') {
    setAppState('setting');
  }
  if (type === 'success') {
    setAppState('submit');
  }
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
