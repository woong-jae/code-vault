export default interface Repository<T> {
  setItem(key: string, data: T): boolean;
}
