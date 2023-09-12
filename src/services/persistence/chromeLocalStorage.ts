import { type Persist, type Retrieve } from '~/shared/kernel';

export const chromeLocalStoragePersist: Persist = async (key, value) => {
  await chrome.storage.local.set({ [key]: JSON.stringify(value) });
};

export const chromeLocalStorageRetrieve: Retrieve = async key => {
  const res = await chrome.storage.local.get(key);
  const value = res?.[key];
  return value ? JSON.parse(value) : null;
};
