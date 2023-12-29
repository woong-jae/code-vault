import type { RepositoryToken } from '../../types';

export type GetInitialToken = () => Promise<RepositoryToken | null>;
