import "client-only";
import { use } from "react";
import useSWR, {
  mutate as globalMutate,
  type SWRConfiguration,
  type SWRResponse,
} from "swr";
import type { Resource } from "./types";
import { useThenableFor } from "./internal/PreloadRegistry";
import { BailoutToCSRError } from "next/dist/shared/lib/lazy-dynamic/bailout-to-csr";

export function usePreloadedSWR<P, D>(
  r: Resource<P, D>,
  p: P,
  swr?: SWRConfiguration<D, unknown>
): SWRResponse<D, unknown> {
  const key = r.key(p);
  if (key == null) throw new Error("usePreloadedSWR: key cannot be null");

  // Suspend on the server-started thenable
  const initial = use(useThenableFor(key)) as D;

  return useSWR<D>(key, (_k, { signal } = {}) => r.client(p, { signal }), {
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
  // If this is called on the server (during SSR), suspend with a promise that never resolves
  // This prevents server-side rendering of lazy components
  if (typeof window === "undefined") {
    throw new BailoutToCSRError("Bailing out of useLazySWR on the server");
  }

  const key = r.key(p);
  const resp = useSWR<D>(
    key,
    key ? (_k, { signal } = {}) => r.client(p, { signal }) : null,
    {
      suspense: true,
      revalidateOnMount: swr?.auto ?? false,
      ...swr,
    }
  );
  const reload = () => {
    if (key != null) void globalMutate(key);
  };
  return Object.assign(resp, { reload });
}
