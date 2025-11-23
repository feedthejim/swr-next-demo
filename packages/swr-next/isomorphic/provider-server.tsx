// provider-server.tsx
import React, { cache, type ReactNode, type JSX } from "react";
import { createStream } from "./stream";
import type { Stream } from "./stream";
import type { ResourceFallbackSource } from "./context";
import type { Resource } from "../types";
import { IsomorphicSwrClientProvider } from "./provider-client";
import { BailoutToCSRError } from "next/dist/shared/lib/lazy-dynamic/bailout-to-csr";
import { serializeKey } from "../utils";

function createResourceFetcherAndStream(): {
  serverFallbackSource: ResourceFallbackSource;
  stream: Stream;
} {
  const { push, values: stream } = createStream();
  const requestCache = new Map<string, Promise<unknown>>();

  const serverFallbackSource: ResourceFallbackSource = <P, Data>(
    resource: Resource<P, Data>,
    params: P,
    required: boolean
  ): Promise<Data> | undefined => {
    const key = resource.key(params);

    if (key === null) {
      if (required) {
        throw new BailoutToCSRError("Resource key is null");
      }
      return undefined;
    }

    const cacheKey = serializeKey(key);
    const cached = requestCache.get(cacheKey);
    if (cached) return cached as Promise<Data>;

    // Use the server function from the resource
    const promise = resource.server(params);
    requestCache.set(cacheKey, promise);
    push({ request: cacheKey, value: promise });
    return promise;
  };

  return { serverFallbackSource, stream };
}

// Ensure a single fetcher/stream per RSC work unit
const getResourceFetcherAndStream = cache(createResourceFetcherAndStream);

export function IsomorphicSwrProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { serverFallbackSource, stream } = getResourceFetcherAndStream();
  return (
    <IsomorphicSwrClientProvider
      serverFallbackSource={serverFallbackSource}
      stream={stream}
    >
      {children}
    </IsomorphicSwrClientProvider>
  );
}
