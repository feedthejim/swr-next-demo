// context.ts
"use client";

import { createContext, useContext } from "react";
import type { Resource } from "../types";

export type ResourceFallbackSource = <P, Data>(
  resource: Resource<P, Data>,
  params: P,
  required: boolean
) => Promise<Data> | undefined;

export type IsomorphicSwrContextValue = {
  isServer: boolean;
  fallbackSource: ResourceFallbackSource;
};

const IsomorphicSwrContext = createContext<IsomorphicSwrContextValue | null>(
  null
);

export function useIsomorphicSwrContext(
  required: boolean
): IsomorphicSwrContextValue | null {
  const ctx = useContext(IsomorphicSwrContext);
  if (!ctx && required) {
    throw new Error("IsomorphicSwrProvider not found");
  }
  return ctx;
}

export { IsomorphicSwrContext };
