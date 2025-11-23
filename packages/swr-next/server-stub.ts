// Server stub for client-side bundles
// This file is loaded when @swr-next/server is imported in client context

import type { Resource, PrefetchHandle } from "./types";

export function defineResource<P, D>(def: Resource<P, D>): Resource<P, D> {
  return {
    key: def.key,
    client: def.client,
    server(): never {
      throw new Error("@swr-next/server cannot be used on the client. Use @swr-next/client instead.");
    },
  };
}

export function prefetch<P, D>(): never {
  throw new Error("prefetch() cannot be used on the client. Use @swr-next/client hooks instead.");
}

export function PreloadBoundary(): never {
  throw new Error("PreloadBoundary cannot be used on the client. It only works in React Server Components.");
}