import { Octokit } from 'octokit';
import { stringToBase64 } from '@base/utils/file';

const clientId = 'e1f73f73ee1f2865bcd5';
const clientSecret = 'aceb34e7192ba7b6181d0c0649373b9fce57cda0';
const access_token_url = 'https://github.com/login/oauth/access_token';

export class Github {
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

    if (!res.data) {
      throw new Error('Not authenticated');
    }
    return res.data;
  }

  async getUserPrimaryEmail() {
    const res =
      await this.githubApiClient.rest.users.listEmailsForAuthenticatedUser();
    return res.data.find((addedEmail) => addedEmail.primary)?.email || null;
  }

  async getRepositories() {
    const res = await this.githubApiClient.rest.repos.listForAuthenticatedUser({
      type: 'owner',
      headers: {
        'cache-control': 'no-cache',
      },
    });

    if (!res.data) return null;
    return res.data;
  }

  async getRepositoryContent({
    owner,
    repo,
    path,
  }: {
    owner: string;
    repo: string;
    path: string;
  }) {
    try {
      const { data } = await this.githubApiClient.rest.repos.getContent({
        owner,
        repo,
        path,
      });

      if (data instanceof Array) {
        return data[0];
      }
      return data;
    } catch {
      return null;
    }
  }

  async uploadContent({
    owner,
    repo,
    path,
    userName,
    email,
    content,
    message,
  }: {
    owner: string;
    repo: string;
    path: string;
    userName: string;
    email: string;
    content: string;
    message: string;
  }) {
    try {
      const oldContent = await this.getRepositoryContent({ owner, repo, path });

      const base64Content = stringToBase64(content);

      this.githubApiClient.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        committer: {
          name: userName,
          email: email,
        },
        content: base64Content,
        sha: oldContent?.sha,
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async uploadContents({
    repo,
    owner,
    userName,
    email,
    contents,
    message,
  }: {
    repo: string;
    owner: string;
    userName: string;
    email: string;
    contents: {
      content: string;
      path: string;
    }[];
    message: string;
  }) {
    try {
      const {
        data: { default_branch },
      } = await this.githubApiClient.rest.repos.get({
        owner,
        repo,
      });

      const ref = `heads/${default_branch}`;

      const {
        data: {
          object: { sha: refSha },
        },
      } = await this.githubApiClient.rest.git.getRef({
        owner,
        repo,
        ref,
      });

      const blobs = await Promise.all(
        contents.map(async ({ content, path }) => {
          const {
            data: { sha },
          } = await this.githubApiClient.rest.git.createBlob({
            owner,
            repo,
            content: stringToBase64(content),
            encoding: 'base64',
          });

          return {
            path,
            sha,
          };
        }),
      );

      const {
        data: { sha: treeSha },
      } = await this.githubApiClient.rest.git.createTree({
        owner,
        repo,
        tree: blobs.map((blob) => {
          return {
            ...blob,
            mode: '100644',
            type: 'blob',
          };
        }),
        base_tree: refSha,
      });

      const {
        data: { sha: commitSha },
      } = await this.githubApiClient.rest.git.createCommit({
        owner,
        repo,
        tree: treeSha,
        message,
        parents: [refSha],
        committer: {
          name: userName,
          email,
        },
      });

      await this.githubApiClient.rest.git.updateRef({
        owner,
        ref,
        repo,
        sha: commitSha,
        force: true,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async createRepository({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) {
    const { data } =
      await this.githubApiClient.rest.repos.createForAuthenticatedUser({
        name,
        description,
        auto_init: true,
      });

    if (!data) return false;
    return true;
  }
}
