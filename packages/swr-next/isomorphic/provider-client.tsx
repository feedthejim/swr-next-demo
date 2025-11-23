// provider-client.tsx
"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { SWRConfig } from "swr";
import type { Stream, StreamItem } from "./stream";
import { IsomorphicSwrContext, type FallbackSource } from "./context";

type ClientProviderProps = {
  fetcher: (key: string) => Promise<unknown>;
  serverFallbackSource: FallbackSource;
  stream: Stream;
  children: ReactNode;
};

export function IsomorphicSwrClientProvider({
  fetcher,
  serverFallbackSource,
  stream,
  children,
}: ClientProviderProps) {
  const isServer = typeof window === "undefined";

  const fallbackSourceRef = useRef<FallbackSource>(() => {
    if (isServer) {
      return serverFallbackSource;
    }
    return resolveClientStream(stream);
  });

  const ctxValue = useMemo(
    () => ({
      isServer,
      fallbackSource: fallbackSourceRef.current,
      fetcher,
    }),
    [isServer, fetcher]
  );

  return (
    <IsomorphicSwrContext.Provider value={ctxValue}>
      <SWRConfig value={{ suspense: true }}>{children}</SWRConfig>
    </IsomorphicSwrContext.Provider>
  );
}

function resolveClientStream(stream: Stream): FallbackSource {
  const stablePromiseMap = new Map<
    string,
    { promise: Promise<unknown>; used: boolean }
  >();

  let started = false;
  function ensureStarted() {
    if (started) return;
    started = true;
    // drain the stream in the background
    (async () => {
      for await (const item of stream) {
        const key = item.request;
        const existing = stablePromiseMap.get(key);
        if (existing) {
          // we already created a promise; ignore, or you could reconcile
          continue;
        }
        stablePromiseMap.set(key, { promise: item.value, used: false });
      }
    })().catch(() => {
      // swallow; demo only
    });
  }

  return (request, _fetchFn, required) => {
    ensureStarted();
    if (!request) {
      if (required) {
        // required but no key: treat as no data; caller can decide
        return Promise.resolve(undefined);
      }
      return undefined;
    }
    const key = request;
    const holder = stablePromiseMap.get(key);
    if (!holder) {
      if (!required) return undefined;
      // required but not in stream yet: create a pending promise that never resolves
      // (React will keep waiting or you can make your own timeout here)
      return new Promise<unknown>(() => {});
    }
    holder.used = true;
    return holder.promise;
  };
}
