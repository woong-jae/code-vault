import { SolutionInterceptor } from '~/core/application/SolutionTracker/ports';
import { SolutionInterceptListener } from '~/core/application/SolutionTracker/types';
import EventHub from '~/core/infrastructure/EventHub';

export default class EventHubAdaptor implements SolutionInterceptor {
  private onInterceptCallback: SolutionInterceptListener | undefined;

  constructor(private readonly eventHub: EventHub) {
    this.eventHub.listen(({ type, payload }) => {
      if (type !== 'solution') return;
      if (!payload) return;

      this.onInterceptCallback?.(JSON.parse(payload));
    });
  }

  onIntercept(callback: SolutionInterceptListener): void {
    this.onInterceptCallback = callback;
  }
}
