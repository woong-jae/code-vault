import type { Solution } from '../types';
import {
  type SolveListener,
  type SolutionStatus,
  Process,
  type SolutionBus,
} from './types';

export default class SolutionTracker {
  private solveListeners: SolveListener[] = [];
  private _solutionData: Partial<Solution> = {};

  constructor(private solutionBus: SolutionBus) {
    this.solutionBus.onIntercept((packet) => {
      this.handlePacket(packet);
    });
  }

  onSolve(callback: SolveListener) {
    this.solveListeners.push(callback);
    return () => {
      this.solveListeners = this.solveListeners.filter(
        (listener) => listener !== callback,
      );
    };
  }

  get solution(): Solution | null {
    const { problemId, platform, title, code, language, time, memory, link } =
      this._solutionData;

    if (problemId === undefined) return null;
    if (platform === undefined) return null;
    if (title === undefined) return null;
    if (code === undefined) return null;
    if (language === undefined) return null;
    if (time === undefined) return null;
    if (memory === undefined) return null;
    if (link === undefined) return null;

    return {
      title,
      problemId,
      platform,
      code,
      language,
      time,
      memory,
      link,
    };
  }

  private notify(solution: Solution) {
    this.solveListeners.forEach((listener) => listener({ ...solution }));
  }

  private handlePacket({ process, payload }: SolutionStatus) {
    if (process === Process.FAIL) {
      this.clearSolutionData();
      return;
    }

    if (process === Process.START) {
      this.clearSolutionData();
    }

    this.updateSolutionData(payload);

    if (process === Process.SUCCESS) {
      const newSolution = this.solution;
      if (!newSolution) {
        throw new Error('Missing data for submitted solution...');
      }

      this.notify(newSolution);
    }
  }

  private updateSolutionData(data: Partial<Solution>) {
    const newData = { ...data };
    const { time: previousTime, memory: previousMemory } = this._solutionData;

    if (previousTime && newData.time) {
      this._solutionData.time = Math.max(previousTime, newData.time);
      delete newData.time;
    }

    if (previousMemory && newData.memory) {
      this._solutionData.memory = Math.max(previousMemory, newData.memory);
      delete newData.memory;
    }

    this._solutionData = {
      ...this._solutionData,
      ...newData,
    };
  }

  private clearSolutionData() {
    this._solutionData = {};
  }
}
