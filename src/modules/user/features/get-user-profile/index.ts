import {
  retrieveRepositoryToken,
  retrieveUserProfile,
} from '../../infras/persistence';
import type { GetUserProfile } from '../types';

const getUserProfile: GetUserProfile = async () => {
  const repositoryToken = await retrieveRepositoryToken();
  if (!repositoryToken) return null;

  const userProfile = await retrieveUserProfile(repositoryToken);
  return userProfile;
};

export default getUserProfile;
