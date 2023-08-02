import createEventHub from '~/chrome-extension/common/createEventHub';

const eventHub = createEventHub('isolated', window);
eventHub.listen(({ type, payload }) => {
  if (type === 'solution') {
    eventHub.emit({
      type,
      payload,
    });
  }
});
