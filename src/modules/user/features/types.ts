import type { RepositoryName, UserProfile } from '../domain/types';

export type SelectIsUserLoggedIn = () => boolean;
export type SelectSelectedRepository = () => RepositoryName | null;

export type IsLoggedIn = () => Promise<boolean>;
export type Login = () => Promise<boolean>;
export type Logout = () => Promise<boolean>;

export type GetUserProfile = () => Promise<UserProfile | null>;
export type GetRepositories = () => Promise<RepositoryName[] | null>;
export type SaveContent = (
  path: string,
  content: string,
  message: string,
) => Promise<boolean>;

export type GetSelectedRepository = () => Promise<RepositoryName | null>;
export type SetSelectedRepository = (
  repositoryName: RepositoryName | null,
) => Promise<void>;
