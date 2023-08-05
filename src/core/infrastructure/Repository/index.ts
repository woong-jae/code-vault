interface Repository<Key, Data> {
  get(key: Key): Promise<Data>;
  set(key: Key, data: Data): Promise<boolean>;
  remove(key: Key): Promise<boolean>;
}
