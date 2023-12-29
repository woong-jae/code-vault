import { create } from 'zustand';
import type { RepositoryName } from '../../types';

export const useUserStore = create<{
  selectedRepository: RepositoryName | null;
}>(() => ({
  selectedRepository: null,
}));

export const readUser = useUserStore.getState;
export const saveUser = useUserStore.setState;
