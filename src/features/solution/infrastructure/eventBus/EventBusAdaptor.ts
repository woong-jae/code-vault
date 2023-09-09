import { EventBus } from '~/shared/kernel';
import { SolutionEventBus, SolutionInterceptListener } from '../../core/types';
import EventTypes from '~/services/eventBus/EventTypes';

export default class EventBusAdaptor implements SolutionEventBus {
  private onInterceptCallback: SolutionInterceptListener | undefined;

  constructor(private readonly eventBus: EventBus) {
    this.eventBus.listen(({ type, payload }) => {
      if (type !== EventTypes.SOLUTION_INTERCEPTED) return;
      if (!payload) return;

      this.onInterceptCallback?.(JSON.parse(payload));
    });
  }

  onIntercept(callback: SolutionInterceptListener): void {
    this.onInterceptCallback = callback;
  }
}
