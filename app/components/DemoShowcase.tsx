"use client";
import { useState } from "react";
import { usePreloadedSWR, useLazySWR } from "@swr-next";
import { photos } from "@/app/lib/resources/photos";
import { CodeBlock } from "./CodeBlock";

export function DemoShowcase() {
  const [selectedLazyAlbum, setSelectedLazyAlbum] = useState<number | null>(null);
  const [showCode, setShowCode] = useState<string | null>(null);

  // Demo 1: usePreloadedSWR (server-prefetched)
  const { 
    data: preloadedData, 
    error: preloadedError, 
    isLoading: preloadedLoading,
    mutate: preloadedMutate
  } = usePreloadedSWR(photos, { albumId: 1 }, {
    revalidateOnFocus: true,
  });

  // Demo 2: useLazySWR (client-only)
  const { 
    data: lazyData, 
    error: lazyError, 
    isLoading: lazyLoading,
    reload: lazyReload
  } = useLazySWR(photos, selectedLazyAlbum ? { albumId: selectedLazyAlbum } : null, {
    auto: false,
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Pattern 1: Server Prefetching */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pattern 1: Server-Side Prefetching
          </h2>
          <p className="text-gray-600">
            Data fetched on server, seamlessly hydrated on client with SWR
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Live Demo */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Live Demo</h3>
              <button
                onClick={() => preloadedMutate()}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Revalidate
              </button>
            </div>

            {preloadedError ? (
              <div className="text-red-600 p-4 bg-red-50 rounded">
                Error: {preloadedError.message}
              </div>
            ) : preloadedLoading ? (
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  ✅ Loaded {preloadedData?.length} photos (Album 1)
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {preloadedData?.slice(0, 8).map((photo) => (
                    <img
                      key={photo.id}
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      className="aspect-square object-cover rounded hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Code Example */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowCode(showCode === 'server' ? null : 'server')}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
              >
                Server Code
              </button>
              <button
                onClick={() => setShowCode(showCode === 'client' ? null : 'client')}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
              >
                Client Code
              </button>
            </div>

            {showCode === 'server' && (
              <CodeBlock
                title="app/page.tsx (Server Component)"
                code={`import { prefetch, PreloadBoundary } from "@swr-next/server";
import { photos } from "./lib/resources/photos-server";

export default async function Page() {
  // Server-side prefetch
  const prefetchedPhotos = prefetch(photos, { albumId: 1 });
  
  return (
    <PreloadBoundary items={[prefetchedPhotos]}>
      <PhotoGrid />
    </PreloadBoundary>
  );
}`}
              />
            )}

            {showCode === 'client' && (
              <CodeBlock
                title="PhotoGrid.tsx (Client Component)"
                code={`"use client";
import { usePreloadedSWR } from "@swr-next/client";
import { photos } from "./lib/resources/photos-client";

export function PhotoGrid() {
  const { data, error, mutate } = usePreloadedSWR(
    photos,
    { albumId: 1 },
    { revalidateOnFocus: true }
  );
  
  // Uses server-prefetched data, then revalidates
  return <div>{/* render photos */}</div>;
}`}
              />
            )}
          </div>
        </div>
      </section>

      {/* Pattern 2: Lazy Loading */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pattern 2: Lazy/Manual Loading
          </h2>
          <p className="text-gray-600">
            Client-only data fetching with manual control
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Live Demo */}
          <div className="bg-white rounded-lg border p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <select
                  value={selectedLazyAlbum || ""}
                  onChange={(e) => setSelectedLazyAlbum(Number(e.target.value) || null)}
                  className="border border-gray-300 rounded px-3 py-2 flex-1"
                >
                  <option value="">Select album...</option>
                  {[1, 2, 3, 4, 5].map(id => (
                    <option key={id} value={id}>Album {id}</option>
                  ))}
                </select>
                <button
                  onClick={lazyReload}
                  disabled={!selectedLazyAlbum || lazyLoading}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {lazyLoading ? "Loading..." : "Load"}
                </button>
              </div>

              <div className="text-sm space-y-1">
                <div>Status: <span className={`font-medium ${
                  lazyLoading ? "text-yellow-600" : 
                  lazyError ? "text-red-600" : 
                  lazyData ? "text-green-600" : "text-gray-600"
                }`}>
                  {lazyLoading ? "Loading" : lazyError ? "Error" : lazyData ? "Loaded" : "Idle"}
                </span></div>
                <div>Photos: {lazyData?.length || 0}</div>
              </div>

              {lazyError && (
                <div className="text-red-600 p-3 bg-red-50 rounded text-sm">
                  {lazyError.message}
                </div>
              )}

              {lazyData && (
                <div className="grid grid-cols-4 gap-2">
                  {lazyData.slice(0, 8).map((photo) => (
                    <img
                      key={photo.id}
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      className="aspect-square object-cover rounded hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Code Example */}
          <div>
            <button
              onClick={() => setShowCode(showCode === 'lazy' ? null : 'lazy')}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded mb-4"
            >
              Show Code
            </button>

            {showCode === 'lazy' && (
              <CodeBlock
                title="LazyDemo.tsx"
                code={`"use client";
import { useLazySWR } from "@swr-next/client";

export function LazyDemo() {
  const [albumId, setAlbumId] = useState(null);
  
  const { data, error, isLoading, reload } = useLazySWR(
    photos,
    albumId ? { albumId } : null, // null = no fetch
    { auto: false } // manual only
  );
  
  return (
    <div>
      <select onChange={(e) => setAlbumId(e.target.value)}>
        <option value="">Select...</option>
        <option value="1">Album 1</option>
      </select>
      <button onClick={reload}>Load Photos</button>
      {data && <PhotoGrid photos={data} />}
    </div>
  );
}`}
              />
            )}
          </div>
        </div>
      </section>

      {/* Resource Definition */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Universal Resource Definition
          </h2>
          <p className="text-gray-600">
            One definition, works everywhere
          </p>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <button
            onClick={() => setShowCode(showCode === 'resource' ? null : 'resource')}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded mb-4"
          >
            Show Resource Definition
          </button>

          {showCode === 'resource' && (
            <CodeBlock
              title="lib/resources/photos.ts"
              code={`import { defineResource } from "@swr-next/server";

type Photo = { id: number; title: string; thumbnailUrl: string };

export const photos = defineResource<{ albumId: number }, Photo[]>({
  // Cache key function
  key: ({ albumId }) => ["photos", albumId],
  
  // Server-side: direct API calls, database queries
  server: async ({ albumId }) => {
    const response = await fetch(
      \`https://jsonplaceholder.typicode.com/photos?albumId=\${albumId}\`,
      { cache: "no-store" }
    );
    return response.json();
  },
  
  // Client-side: API routes, GraphQL endpoints
  client: async ({ albumId }, { signal }) => {
    const response = await fetch(\`/api/photos?albumId=\${albumId}\`, { signal });
    if (!response.ok) throw new Error("Fetch failed");
    return response.json();
  },
});`}
            />
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Why swr-next?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Performance</h3>
            <p className="text-sm text-gray-600">Server-side data fetching with instant page loads</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold mb-2">Seamless Hydration</h3>
            <p className="text-sm text-gray-600">Server data flows seamlessly to client SWR</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold mb-2">Type Safety</h3>
            <p className="text-sm text-gray-600">Full TypeScript support across boundaries</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-semibold mb-2">Optimized Bundles</h3>
            <p className="text-sm text-gray-600">Smart code splitting for server/client</p>
          </div>
        </div>
      </section>
    </div>
  );
}