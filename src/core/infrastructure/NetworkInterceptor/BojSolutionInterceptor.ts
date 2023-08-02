import BaseSolutionInterceptor from './BaseNetworkInterceptor';

/* TODO: 프로그래머스 작업 후 예정 */
export default class BojSolutionInterceptor extends BaseSolutionInterceptor {
  notify(interceptedPacket: string) {
    console.log(interceptedPacket);
  }
}
