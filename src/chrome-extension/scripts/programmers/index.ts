import SolutionTracker from '~/core/application/SolutionTracker';
import ProgrammersSolutionInterceptor from '~/core/adapter/NetworkInterceptor/ProgrammersSolutionInterceptor';
import ProgrammersPacketToSolutionStatusMapper from '~/core/adapter/PacketInterpreter/ProgrammersPacketToSolutionStatusMapper';

console.log('CodeVault loaded...');

const solutionTracker = new SolutionTracker(
  new ProgrammersSolutionInterceptor(),
  new ProgrammersPacketToSolutionStatusMapper(),
);

solutionTracker.onSolve(solution => {
  console.log(solution);
});
