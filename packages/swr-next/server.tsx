import "server-only";
import React from "react";
import { cache } from "react";
import type { Key, Resource, PrefetchHandle } from "./types";
import { PreloadRegistry } from "./internal/PreloadRegistry";

// Per-request dedupe for prefetch; relies on referential resource + params
const _prefetch = cache(<P, D>(r: Resource<P, D>, p: P): PrefetchHandle => {
  const key = r.key(p);
  if (key == null) throw new Error("prefetch(): key cannot be null");
  // Do not await — hand a thenable to React Flight
  return { key, promise: r.server(p) as Promise<D> };
});

export function prefetch<P, D>(r: Resource<P, D>, p: P): PrefetchHandle {
  return _prefetch(r, p);
}

export function PreloadBoundary({
  items,
  children,
}: {
  items: PrefetchHandle[];
  children: React.ReactNode;
}) {
  // Server renders a client provider carrying the thenables
  return <PreloadRegistry items={items}>{children}</PreloadRegistry>;
}
