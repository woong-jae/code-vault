import { Github } from '@base/services/github';

export async function retrieveUserProfile(accessToken: AccessToken) {
  const githubRepository = new Github(accessToken);

  const userRichProfile = await githubRepository.getUserStatus();

  return {
    id: userRichProfile.login,
    email: userRichProfile.html_url,
    avatarUrl: userRichProfile.avatar_url,
  };
}
