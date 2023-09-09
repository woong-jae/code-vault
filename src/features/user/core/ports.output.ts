import { RepositoryName, RepositoryToken } from './types';

/* Repository token */
export type PersistRepositoryToken = (token: RepositoryToken) => void;
export type RetrieveRepositoryToken = () => RepositoryToken | null;

/* Repositories */
export type RetrieveRepositories = (
  repositoryToken: RepositoryToken,
) => Promise<RepositoryName[]>;

/* User selected repository */
export type PersistSelectedRepository = (
  repositoryName: RepositoryName,
) => void;
