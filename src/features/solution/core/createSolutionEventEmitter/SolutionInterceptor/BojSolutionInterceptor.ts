import BaseSolutionInterceptor from './BaseSolutionInterceptor';

interface PusherChannel {
  [channelName: string]: {
    bind: (eventName: string, cb: (data: unknown) => void) => void;
  };
}

declare global {
  interface Window {
    pusher?: {
      channels: {
        channels: PusherChannel;
      };
    };
  }
}

export default class BojSolutionInterceptor extends BaseSolutionInterceptor {
  constructor() {
    super();
    this.injectPusherMessageInterceptor();
  }

  injectPusherMessageInterceptor() {
    (() => {
      if (window?.pusher === undefined)
        throw new Error('pusher가 window에 존재하지 않음');

      const { channels } = window.pusher.channels;
      Object.keys(channels).forEach(channelName => {
        // Channel에서 listen할 이벤트 타입에 대한 콜백을 bind 한다.
        channels[channelName].bind('update', data => {
          this.notify(JSON.stringify(data));
        });
      });
    })();
  }
}
