import createEventBus from '../event-bus';

export const alertToWorld = (message: string) => {
  createEventBus('background').emit({
    type: 'ALERT',
    payload: message,
  });
};

export const onAlert = (alert: (message: string) => void) => {
  createEventBus('world').listen(({ type, payload }) => {
    if (type !== 'ALERT') return;

    const message = payload ?? '';
    alert(message);
  });
};
