// Client stub for React Server Components
// This file is loaded when @swr-next/client is imported in RSC context

export function defineResource(): never {
  throw new Error("@swr-next/client cannot be used in React Server Components. Use @swr-next/server instead.");
}

export function usePreloadedSWR(): never {
  throw new Error("@swr-next/client cannot be used in React Server Components. Use @swr-next/server instead.");
}

export function useLazySWR(): never {
  throw new Error("@swr-next/client cannot be used in React Server Components. Use @swr-next/server instead.");
}