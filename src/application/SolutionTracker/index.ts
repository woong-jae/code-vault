import { Process, SolutionData, SolutionStatus, SolveListener } from './types';
import { NetworkInterceptor, PacketInterpreter } from './ports';

export default class SolutionTracker {
  private solveListeners: SolveListener[] = [];
  private _solutionData: Partial<SolutionData> = {};

  constructor(
    private networkInterceptor: NetworkInterceptor,
    private packetInterpreter: PacketInterpreter,
  ) {
    this.networkInterceptor.onIntercept(rawPacket => {
      const packet = this.packetInterpreter.parse(rawPacket);
      if (!packet) return;
      this.handlePacket(packet);
    });
  }

  onSolve(callback: SolveListener) {
    this.solveListeners.push(callback);
    return () => {
      this.solveListeners = this.solveListeners.filter(
        listener => listener !== callback,
      );
    };
  }

  private notify(solutionData: SolutionData) {
    this.solveListeners.forEach(listener => listener({ ...solutionData }));
  }

  private handlePacket({ process, payload }: SolutionStatus) {
    if (process === Process.FAIL) {
      this.clearSolutionData();
      return;
    }

    this.updateSolutionData(payload);

    if (process === Process.SUCCESS) {
      const solutionData = this.getSolutionData();
      if (!solutionData) {
        throw new Error('Missing data for submitted solution!');
      }
      this.notify(solutionData);
      this.clearSolutionData();
      return;
    }
  }

  private getSolutionData(): SolutionData | null {
    const { problemId, platform, code, language } = this._solutionData;

    if (problemId === undefined) return null;
    if (platform === undefined) return null;
    if (code === undefined) return null;
    if (language === undefined) return null;

    return {
      problemId,
      platform,
      code,
      language,
    };
  }

  private updateSolutionData(data: Partial<SolutionData>) {
    this._solutionData = {
      ...this._solutionData,
      ...data,
    };
  }

  private clearSolutionData() {
    this._solutionData = {};
  }
}
