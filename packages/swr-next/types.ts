export type Key = string | readonly unknown[] | null;

export type Resource<P, D> = {
  key: (params: P) => Key;
  server: (params: P) => Promise<D>; // server-only fast path
  client: (params: P, ctx?: { signal?: AbortSignal }) => Promise<D>; // browser path
};

export type PrefetchHandle = {
  key: Key;
  promise: Promise<unknown>;
};
