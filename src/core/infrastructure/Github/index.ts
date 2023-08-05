import { Octokit } from 'octokit';

const clientId = 'e1f73f73ee1f2865bcd5';
const clientSecret = 'aceb34e7192ba7b6181d0c0649373b9fce57cda0';
const access_token_url = 'https://github.com/login/oauth/access_token';

export default class Github {
  private githubApiClient: Octokit;

  constructor(access_token: string) {
    this.githubApiClient = new Octokit({ auth: access_token });
  }

  static async getAccessToken(code: string): Promise<string | null> {
    const url = new URL(access_token_url);
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('client_secret', clientSecret);
    url.searchParams.append('code', code);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'code-vault',
      },
    });

    const data = await response.formData();
    return data.get('access_token') as string | null;
  }

  async getUserStatus() {
    const res = await this.githubApiClient.rest.users.getAuthenticated();

    if (!res.data) return null;
    return res.data;
  }

  async getRepositories() {
    const res = await this.githubApiClient.rest.repos.listForAuthenticatedUser({
      type: 'owner',
    });

    if (!res.data) return null;
    return res.data;
  }
}
