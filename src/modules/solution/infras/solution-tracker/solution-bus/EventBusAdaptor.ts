import type { SolutionBus, SolutionInterceptListener } from '../types';

export default class EventBusAdaptor implements SolutionBus {
  private onInterceptCallback: SolutionInterceptListener | undefined;

  constructor(private readonly eventBus: EventBus) {
    this.eventBus.listen(({ type, payload }) => {
      if (type !== 'SOLUTION_INTERCEPTED') return;
      if (!payload) return;

      this.onInterceptCallback?.(JSON.parse(payload));
    });
  }

  onIntercept(callback: SolutionInterceptListener): void {
    this.onInterceptCallback = callback;
  }
}
