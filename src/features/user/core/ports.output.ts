import { RepositoryName, RepositoryToken, UserProfile } from './types';

/* User Profile */
export type RetrieveUserProfile = (
  token: RepositoryToken,
) => Promise<UserProfile>;

/* Repository token */
export type PersistRepositoryToken = (token: RepositoryToken) => void;
export type RetrieveRepositoryToken = () => RepositoryToken | null;

/* Repositories */
export type RetrieveRepositories = (
  repositoryToken: RepositoryToken,
) => Promise<RepositoryName[]>;

export type PersistContent = (persistContentParams: {
  repositoryName: RepositoryName;
  repositoryToken: RepositoryToken;
  path: string;
  content: string;
  message: string;
}) => Promise<boolean>;

/* User selected repository */
export type PersistSelectedRepository = (
  repositoryName: RepositoryName,
) => void;
export type RetrieveSelectedRepository = () => RepositoryName | null;
