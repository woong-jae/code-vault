import BaseSolutionInterceptor from '~/modules/solution/infra/solution-tracker/solution-catcher/BaseSolutionInterceptor';

export default class ProgrammersSolutionInterceptor extends BaseSolutionInterceptor {
  constructor() {
    super();
    this.injectWsRequestInterceptor();
    this.injectWsResponseInterceptor();
  }

  private injectWsRequestInterceptor() {
    const notify = this.notify.bind(this);

    (send => {
      window.WebSocket.prototype.send = function sendWrapper(
        data: string | ArrayBufferLike | Blob | ArrayBufferView,
      ) {
        if (typeof data === 'string') {
          notify(data);
        }
        return send.apply(this, [data]);
      };
      // eslint-disable-next-line @typescript-eslint/unbound-method
    })(window.WebSocket.prototype.send);
  }

  private injectWsResponseInterceptor() {
    const property = Object.getOwnPropertyDescriptor(
      MessageEvent.prototype,
      'data',
    ) as PropertyDescriptor;
    const notify = this.notify.bind(this);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const data = property.get as () => string;

    function lookAtMessage(this: MessageEvent) {
      // to replace get function
      const socket = this.currentTarget instanceof WebSocket;
      if (!socket) {
        return data.call(this);
      }

      const msg = data.call(this);
      Object.defineProperty(this, 'data', { value: msg }); // anti-loop
      notify(msg);
      return msg;
    }

    property.get = lookAtMessage;
    Object.defineProperty(MessageEvent.prototype, 'data', property);
  }
}
