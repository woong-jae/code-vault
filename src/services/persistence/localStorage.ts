import { Persist, Retrieve } from '~/shared/kernel';

export const localStoragePersist: Persist = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageRetrieve: Retrieve = key => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
