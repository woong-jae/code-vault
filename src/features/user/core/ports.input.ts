import { RepositoryName } from './types';

export type GetRepositories = () => Promise<RepositoryName[] | null>;

export type GetSelectedRepository = () => RepositoryName | null;
export type SetSelectedRepository = (repositoryName: RepositoryName) => void;
