import { create } from 'zustand';
import type { UserModel } from '../../core/types';

export const user = create<UserModel>(() => ({
  isLoggedIn: false,
  selectedRepository: null,
}));
