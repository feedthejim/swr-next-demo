// Common APIs - types and defineResource only
// For server APIs: import from "@swr-next/server"  
// For client APIs: import from "@swr-next/client"

import type { Resource, Key, PrefetchHandle } from "./types";

// Universal defineResource that works in both contexts
export function defineResource<P, D>(def: Resource<P, D>): Resource<P, D> {
  return def;
}

// Export types
export type { Resource, Key, PrefetchHandle };