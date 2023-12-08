import type { RepositoryToken } from '../../core/types';

export type GetInitialToken = () => Promise<RepositoryToken | null>;
