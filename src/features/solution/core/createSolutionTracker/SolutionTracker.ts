import {
  Process,
  Solution,
  SolutionEventBus,
  SolutionStatus,
  SolveListener,
} from '../types';

export default class SolutionTracker {
  private solveListeners: SolveListener[] = [];
  private _solutionData: Partial<Solution> = {};

  constructor(private solutionEventBus: SolutionEventBus) {
    this.solutionEventBus.onIntercept(packet => {
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

  private notify(solution: Solution) {
    this.solveListeners.forEach(listener => listener({ ...solution }));
  }

  private handlePacket({ process, payload }: SolutionStatus) {
    if (process === Process.FAIL) {
      this.clearSolutionData();
      return;
    }

    this.updateSolutionData(payload);

    if (process === Process.SUCCESS) {
      const newSolution = this.getSolution();
      if (!newSolution) {
        throw new Error('Missing data for submitted solution...');
      }

      this.notify(newSolution);

      this.clearSolutionData();
      return;
    }
  }

  private getSolution(): Solution | null {
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

  private updateSolutionData(data: Partial<Solution>) {
    this._solutionData = {
      ...this._solutionData,
      ...data,
    };
  }

  private clearSolutionData() {
    this._solutionData = {};
  }
}
