import renderApp from '~/app';
import ProgrammersSolutionInterceptor from '~/core/adapter/NetworkInterceptor/ProgrammersSolutionInterceptor';
import ProgrammersPacketToSolutionStatusMapper from '~/core/adapter/PacketInterpreter/ProgrammersPacketToSolutionStatusMapper';
import SolutionTracker from '~/core/application/SolutionTracker';

console.log('CodeVault loaded...');

const solutionTracker = new SolutionTracker(
  new ProgrammersSolutionInterceptor(),
  new ProgrammersPacketToSolutionStatusMapper(),
);

solutionTracker.onSolve(solution => {
  console.log(solution);
});

renderApp(document.body);
