import { RepositoryName } from './types';

export type GetRepositories = () => Promise<RepositoryName[] | null>;
export type SaveContent = (
  path: string,
  content: string,
  message: string,
) => Promise<boolean>;

export type SetSelectedRepository = (repositoryName: RepositoryName) => void;
