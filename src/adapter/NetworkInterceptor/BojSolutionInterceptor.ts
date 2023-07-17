import BaseSolutionInterceptor from './BaseNetworkInterceptor';

export default class BojSolutionInterceptor extends BaseSolutionInterceptor {
  notify(interceptedPacket: string) {
    console.log(interceptedPacket);
  }
}
