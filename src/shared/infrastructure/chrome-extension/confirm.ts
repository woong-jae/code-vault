import type { Context } from '~/shared/kernel';
import createEventBus from '../eventBus';

export const crossContextConfirm = async (
  context: Context,
  message: string,
): Promise<boolean> => {
  return new Promise(resolve => {
    const eventBus = createEventBus(context);

    eventBus.emit({
      type: 'CROSS_CONTEXT_CONFIRM_REQUEST',
      payload: message,
    });

    const unsubscribe = eventBus.listen(({ type, payload }) => {
      if (type !== 'CROSS_CONTEXT_CONFIRM_RESPONSE') return;

      unsubscribe();

      const isConfirm = payload ? (JSON.parse(payload) as boolean) : false;

      resolve(isConfirm);
    });
  });
};

export const onCrossContextConfirm = (
  context: Context,
  confirm: (message: string) => boolean,
) => {
  const eventBus = createEventBus(context);

  eventBus.listen(({ type, payload }) => {
    if (type !== 'CROSS_CONTEXT_CONFIRM_REQUEST') return;

    const message = payload ?? '';

    const isConfirm = confirm(message);

    eventBus.emit({
      type: 'CROSS_CONTEXT_CONFIRM_RESPONSE',
      payload: JSON.stringify(isConfirm),
    });
  });
};
