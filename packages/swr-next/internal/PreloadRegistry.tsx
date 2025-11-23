"use client";
import React, { createContext, useContext } from "react";
import type { Key } from "../types";
import { serializeKey } from "../utils";

type Ctx = Map<string, Promise<unknown>>;
const Registry = createContext<Ctx | null>(null);

export function PreloadRegistry({
  items,
  children,
}: {
  items: Array<{ key: Key; promise: Promise<unknown> }>;
  children: React.ReactNode;
}) {
  const map: Ctx = new Map();
  for (const { key, promise } of items) {
    map.set(serializeKey(key), promise);
  }
  return <Registry.Provider value={map}>{children}</Registry.Provider>;
}

export function useThenableFor(key: Key): Promise<unknown> {
  const ctx = useContext(Registry);
  if (!ctx) {
    throw new Error(
      "Missing PreloadBoundary: wrap subtree with <PreloadBoundary items={[prefetch(...), ...]}>"
    );
  }
  const t = ctx.get(serializeKey(key));
  if (!t) {
    throw new Error(
      `usePreloadedSWR: no prefetched promise for key ${serializeKey(key)}`
    );
  }
  return t;
}
