export type RepositoryToken = string;
export type RepositoryName = string;
export type UserProfile = {
  id: string;
  email: string;
  avatarUrl: string;
};

export type UserModel = {
  isLoggedIn: boolean;
  selectedRepository: RepositoryName | null;
};
