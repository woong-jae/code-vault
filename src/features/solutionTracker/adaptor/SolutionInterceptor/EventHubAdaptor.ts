import { SolutionInterceptor } from '~/features/solutionTracker/core/SolutionTracker/ports';
import { SolutionInterceptListener } from '~/features/solutionTracker/core/SolutionTracker/types';
import EventHub from '~/services/EventHub';
import EventTypes from '~/services/EventHub/EventTypes';

export default class EventHubAdaptor implements SolutionInterceptor {
  private onInterceptCallback: SolutionInterceptListener | undefined;

  constructor(private readonly eventHub: EventHub) {
    this.eventHub.listen(({ type, payload }) => {
      if (type !== EventTypes.SOLUTION_INTERCEPTED) return;
      if (!payload) return;

      this.onInterceptCallback?.(JSON.parse(payload));
    });
  }

  onIntercept(callback: SolutionInterceptListener): void {
    this.onInterceptCallback = callback;
  }
}
