export default interface Archive<T> {
  save: (key: string, data: T) => Promise<void>;
}
