import { RepositoryName } from './types';

export type SetSelectedRepository = (repositoryName: RepositoryName) => void;
export type GetRepositories = () => Promise<RepositoryName[] | null>;
