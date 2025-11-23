import type { Key } from "./types";

export const serializeKey = (k: Key): string =>
  Array.isArray(k) ? JSON.stringify(k) : String(k);
