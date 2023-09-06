// Persistence:
type PersistenceKey = string;
export type Persist = <T>(key: PersistenceKey, value: T) => void;
export type Retrieve = <T>(key: PersistenceKey) => T | null;
