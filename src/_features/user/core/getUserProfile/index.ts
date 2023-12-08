import {
  retrieveRepositoryToken,
  retrieveUserProfile,
} from '../../infrastructure/persistence';
import type { GetUserProfile } from '../ports.input';

const getUserProfile: GetUserProfile = async () => {
  const repositoryToken = await retrieveRepositoryToken();
  if (!repositoryToken) return null;

  const userProfile = await retrieveUserProfile(repositoryToken);
  return userProfile;
};

export default getUserProfile;
