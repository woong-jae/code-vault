import { Persist, Retrieve } from '~/shared/kernel';

export const localStoragePersist: Persist = async (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageRetrieve: Retrieve = async key => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
