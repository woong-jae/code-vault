import { RepositoryName, RepositoryToken, UserProfile } from './types';

/* User Profile */
export type RetrieveUserProfile = (
  token: RepositoryToken,
) => Promise<UserProfile>;

/* Repository token */
export type GetInitialToken = () => Promise<RepositoryToken | null>;
export type PersistRepositoryToken = (token: RepositoryToken | null) => Promise<void>;
export type RetrieveRepositoryToken = () => Promise<RepositoryToken | null>;

/* Repository */
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
) => Promise<void>;
export type RetrieveSelectedRepository = () => Promise<RepositoryName | null>;
