export default interface Repository<K, T> {
  getItem: (key: K) => Promise<T | null>;
  setItem: (key: K, item: T) => Promise<void>;
}
