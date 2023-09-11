import { RepositoryName, UserProfile } from './types';

export type Login = () => Promise<boolean>;
export type Logout = () => Promise<boolean>;

export type GetUserProfile = () => Promise<UserProfile | null>;
export type GetRepositories = () => Promise<RepositoryName[] | null>;
export type SaveContent = (
  path: string,
  content: string,
  message: string,
) => Promise<boolean>;

export type SetSelectedRepository = (repositoryName: RepositoryName) => void;
