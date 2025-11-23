# swr-next

An innovative React data fetching library that bridges server-side rendering and client-side hydration with seamless SWR integration. Built for Next.js App Router with full TypeScript support.

## Overview

`swr-next` provides a unified approach to data fetching that works across server and client environments. It leverages React's Suspense and Next.js's streaming capabilities while maintaining SWR's powerful caching and revalidation features.

### Key Features

- **Universal Resources**: Define data fetching logic once, use everywhere
- **Server-Side Prefetching**: Leverage React Server Components for fast initial loads
- **Client-Side Hydration**: Seamless transition from server-rendered to interactive
- **SWR Integration**: Built-in caching, revalidation, and error handling
- **TypeScript First**: Full type safety across server and client boundaries
- **Bundle Splitting**: Optimized builds with separate server/client bundles

## Core Concepts

### Resources

A Resource defines how to fetch data in both server and client environments:

```ts
// app/lib/resources/photos.ts
import { defineResource } from "@swr-next/server";

type Photo = { id: number; title: string; thumbnailUrl: string };

export const photos = defineResource<{ albumId: number }, Photo[]>({
  key: ({ albumId }) => ["photos", albumId],
  
  // Server-side: direct API calls, database queries, etc.
  server: async ({ albumId }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
      { cache: "no-store" }
    );
    return response.json();
  },
  
  // Client-side: API routes, GraphQL, etc.
  client: async ({ albumId }, { signal }) => {
    const response = await fetch(`/api/photos?albumId=${albumId}`, { signal });
    if (!response.ok) throw new Error("Fetch failed");
    return response.json();
  },
});
```

### Server-Side Prefetching

```tsx
// app/photos/[albumId]/page.tsx
import { prefetch, PreloadBoundary } from "@swr-next/server";
import { photos } from "@/lib/resources/photos";
import { PhotoGrid } from "./PhotoGrid";

export default async function PhotosPage({ 
  params 
}: { 
  params: Promise<{ albumId: string }> 
}) {
  const { albumId } = await params;
  const albumIdNum = parseInt(albumId);
  
  // Prefetch data on server
  const prefetchedPhotos = prefetch(photos, { albumId: albumIdNum });
  
  return (
    <PreloadBoundary items={[prefetchedPhotos]}>
      <PhotoGrid albumId={albumIdNum} />
    </PreloadBoundary>
  );
}
```

### Client-Side Consumption

```tsx
// app/photos/[albumId]/PhotoGrid.tsx
"use client";
import { usePreloadedSWR, useLazySWR } from "@swr-next/client";
import { photos } from "@/lib/resources/photos";

export function PhotoGrid({ albumId }: { albumId: number }) {
  // Uses server-prefetched data, then revalidates on client
  const { data, error, isLoading, mutate } = usePreloadedSWR(
    photos, 
    { albumId },
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
    }
  );
  
  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map(photo => (
        <img 
          key={photo.id}
          src={photo.thumbnailUrl} 
          alt={photo.title}
        />
      ))}
    </div>
  );
}
```

### Lazy Loading

```tsx
"use client";
import { useLazySWR } from "@swr-next/client";
import { photos } from "@/lib/resources/photos";

export function LazyPhotoGrid() {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  
  const { data, error, isLoading, reload } = useLazySWR(
    photos,
    selectedAlbum ? { albumId: selectedAlbum } : null, // null key = no fetch
    { auto: false } // Manual trigger only
  );
  
  return (
    <div>
      <select onChange={(e) => setSelectedAlbum(Number(e.target.value))}>
        <option value="">Select album...</option>
        {[1, 2, 3].map(id => <option key={id} value={id}>Album {id}</option>)}
      </select>
      
      <button onClick={reload} disabled={!selectedAlbum}>
        Load Photos
      </button>
      
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className="grid grid-cols-4 gap-4">
          {data.map(photo => (
            <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Server API (`@swr-next/server`)

#### `defineResource<P, D>(definition)`
Creates a resource with separate server/client implementations.

**Parameters:**
- `definition.key: (params: P) => Key` - Cache key generator
- `definition.server: (params: P) => Promise<D>` - Server-side fetcher
- `definition.client: (params: P, ctx?) => Promise<D>` - Client-side fetcher

#### `prefetch<P, D>(resource, params)`
Prefetches data on the server, returns handle for PreloadBoundary.

#### `<PreloadBoundary items={[...]}>`
React component that provides prefetched data to client components.

### Client API (`@swr-next/client`)

#### `usePreloadedSWR<P, D>(resource, params, config?)`
Consumes server-prefetched data with SWR revalidation.

**Returns:** Standard SWR response object with `data`, `error`, `isLoading`, `mutate`, etc.

#### `useLazySWR<P, D>(resource, params, config?)`
Manual data fetching with SWR caching (no server prefetch required).

**Returns:** SWR response + `reload()` function for manual triggers.

**Config options:**
- `auto: boolean` - Auto-fetch when key changes (default: false)
- All standard SWR configuration options

### Types

```ts
type Key = string | readonly unknown[] | null;

type Resource<P, D> = {
  key: (params: P) => Key;
  server: (params: P) => Promise<D>;
  client: (params: P, ctx?: { signal?: AbortSignal }) => Promise<D>;
};
```

## Bundle Optimization

The library uses conditional exports for optimal bundle splitting:

```json
{
  "exports": {
    "./client": {
      "react-server": "./client.react-server.js",
      "default": "./client.js"
    },
    "./server": {
      "react-server": "./server.react-server.js", 
      "default": "./server.js"
    }
  }
}
```

- Server components get server-optimized builds
- Client components get SWR-enabled builds
- Dead code elimination removes unused paths

## Architecture

```
┌─────────────────┐    ┌─────────────────┐
│  Server Bundle  │    │  Client Bundle  │
├─────────────────┤    ├─────────────────┤
│ defineResource  │    │ defineResource  │
│ prefetch        │    │ usePreloadedSWR │
│ PreloadBoundary │    │ useLazySWR      │
│ + server logic  │    │ + client logic  │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────┬───────────────┘
                 │
        ┌─────────────────┐
        │   Resource      │
        │   Definition    │
        └─────────────────┘
```

## Benefits

1. **Performance**: Server-side data fetching with streaming
2. **User Experience**: Instant page loads with progressive enhancement  
3. **Developer Experience**: Single resource definition for all environments
4. **Flexibility**: Works with any data source (REST, GraphQL, databases)
5. **Scalability**: Optimized bundles and efficient caching

## Current State

The library foundation is solid with core server/client APIs implemented. The demo app currently shows a basic Next.js template and needs enhancement to showcase the library's capabilities.