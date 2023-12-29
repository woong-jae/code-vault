import type { AccessToken } from '~/features/auth';
import { retrieveUserProfile } from '../../infra/persistence';

const getUserProfile = async (accessToken: AccessToken) => {
  const userProfile = await retrieveUserProfile(accessToken);
  return userProfile;
};

export default getUserProfile;
