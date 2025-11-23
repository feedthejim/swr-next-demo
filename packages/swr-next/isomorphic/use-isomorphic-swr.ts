// use-isomorphic-swr.ts
"use client";

import { use } from "react";
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
import { useIsomorphicSwrContext } from "./context";
import type { Resource, Key } from "../types";
import { serializeKey } from "../utils";

export type IsomorphicSWRResponse<Data, Error = unknown> = {
  data: Data;
} & Pick<SWRResponse<Data, Error>, "mutate" | "isValidating">;

export function useIsomorphicSWR<P, Data, Error = unknown>(
  resource: Resource<P, Data>,
  params: P,
  config?: SWRConfiguration<Data, Error>
): IsomorphicSWRResponse<Data, Error> {
  const context = useIsomorphicSwrContext(true)!;
  const { isServer, fallbackSource } = context;

  // Generate the cache key using the resource
  const key = resource.key(params);
  const cacheKey = serializeKey(key);

  // On server: call fallbackSource to trigger server fetch and get the promise,
  // then use() that promise to suspend until it resolves.
  let fallbackData: Data | undefined;
  if (isServer && key !== null) {
    const promise = fallbackSource(resource, params, true);
    if (promise) {
      const value = use(promise as Promise<Data>);
      fallbackData = value;
    }
  }

  // Client-side fetcher using the resource's client function
  const clientFetcher = async (): Promise<Data> => {
    if (key === null) {
      throw new Error("Cannot fetch with null key");
    }
    return resource.client(params);
  };

  // On client: SWR reuses the same key and fetcher, and can also see
  // the promise via the stream-based fallbackSource if needed.
  const { data, isValidating, mutate } = useSWR<Data, Error>(
    cacheKey,
    clientFetcher,
    {
      ...config,
      suspense: true,
      fallbackData:
        fallbackData !== undefined ? fallbackData : config?.fallbackData,
    }
  );

  if (data === undefined) {
    throw new Error(`NO DATA for resource with key "${cacheKey}"`);
  }

  return { data, isValidating, mutate };
}
