import { RepositoryName, RepositoryToken } from './types';

export type PersistRepositoryToken = (token: RepositoryToken) => void;
export type RetrieveRepositoryToken = () => RepositoryToken | null;

export type RetrieveRepositories = (
  repositoryToken: RepositoryToken,
) => Promise<RepositoryName[]>;

export type PersistSelectedRepository = (repositoryName: RepositoryName) => void;
