import type {
  RepositoryToken,
  UserProfile,
  RepositoryName,
} from '../../types';

export type RetrieveUserProfile = (
  token: RepositoryToken,
) => Promise<UserProfile>;

export type PersistRepositoryToken = (
  token: RepositoryToken | null,
) => Promise<void>;
export type RetrieveRepositoryToken = () => Promise<RepositoryToken | null>;

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

export type PersistSelectedRepository = (
  repositoryName: RepositoryName | null,
) => Promise<void>;
export type RetrieveSelectedRepository = () => Promise<RepositoryName | null>;
