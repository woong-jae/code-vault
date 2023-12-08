import BaseSolutionInterceptor from '~/modules/solution/infras/solution-tracker/solution-catcher/BaseSolutionInterceptor';

export default class LeetcodeSolutionInterceptor extends BaseSolutionInterceptor {
  constructor() {
    super();
    this.injectFetchResponseInterceptor();
  }

  private injectFetchResponseInterceptor() {
    (fetch => {
      window.fetch = async (...args) => {
        const res = await fetch(...args);

        res
          .clone()
          .json()
          .then(data => this.notify(JSON.stringify(data)));

        return res;
      };
    })(window.fetch);
  }
}
