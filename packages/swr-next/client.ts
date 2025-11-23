"use client";
import "client-only";
import { use } from "react";
import useSWR, {
  mutate as globalMutate,
  type SWRConfiguration,
  type SWRResponse,
} from "swr";
import type { Resource } from "./types";
import { useThenableFor } from "./internal/PreloadRegistry";

export function defineResource<P, D>(def: Resource<P, D>) {
  // On client bundles, expose { key, client, server: throwing stub }
  return {
    key: def.key,
    client: def.client,
    server(): never {
      throw new Error("Resource.server() cannot run on the client bundle");
    },
  } as Resource<P, D>;
}

export function usePreloadedSWR<P, D>(
  r: Resource<P, D>,
  p: P,
  swr?: SWRConfiguration<D, unknown>
): SWRResponse<D, unknown> {
  const key = r.key(p);
  if (key == null) throw new Error("usePreloadedSWR: key cannot be null");

  // Suspend on the server-started thenable
  const initial = use(useThenableFor(key)) as D;

  return useSWR<D>(key, (_k, { signal }) => r.client(p, { signal }), {
    fallbackData: initial,
    revalidateOnMount: false,
    suspense: true,
    ...swr,
  });
}

export function useLazySWR<P, D>(
  r: Resource<P, D>,
  p: P,
  swr?: SWRConfiguration<D, unknown> & { auto?: boolean }
): SWRResponse<D, unknown> & { reload: () => void } {
  const key = r.key(p);
  const resp = useSWR<D>(
    key,
    key ? (_k, { signal }) => r.client(p, { signal }) : null,
    {
      suspense: false,
      revalidateOnMount: swr?.auto ?? false,
      ...swr,
    }
  );
  const reload = () => {
    if (key != null) void globalMutate(key);
  };
  return Object.assign(resp, { reload });
}
