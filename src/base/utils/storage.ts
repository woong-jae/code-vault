export function createStorageKey(key: string) {
  return `code-vault:${key}`;
}

export function defineBrowserStorage<T>({
  storage,
  key,
}: {
  storage: Storage;
  key: string;
}) {
  const enrichedKey = createStorageKey(key);
  return {
    persist(data: T) {
      storage.setItem(enrichedKey, JSON.stringify(data));
    },
    retrieve() {
      return storage.getItem(enrichedKey);
    },
    clear() {
      storage.removeItem(enrichedKey);
    },
  };
}

export function defineChromeExtensionStorage<T>({
  storage,
  key,
}: {
  storage: chrome.storage.StorageArea;
  key: string;
}) {
  const enrichedKey = createStorageKey(key);
  return {
    async persist(data: T) {
      await storage.set({ [enrichedKey]: JSON.stringify(data) });
    },
    async retrieve(): Promise<T | null> {
      const res = await storage.get(enrichedKey);
      const value = res?.[enrichedKey];
      return value === undefined || value === null ? null : JSON.parse(value);
    },
    async clear() {
      await storage.remove(enrichedKey);
    },
  };
}
