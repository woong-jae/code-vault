export default class Github {
  private readonly clientId = 'e1f73f73ee1f2865bcd5';
  private readonly clientSecret = 'c774ea81ebbdf91170da4495f786751439bf106c';
  private readonly scopes = ['repo'];
  private readonly access_token_url =
    'https://github.com/login/oauth/access_token';

  constructor() {}

  async getAccessToken(code: string) {}
}
