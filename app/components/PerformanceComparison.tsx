"use client";

import { CodeBlock } from "./CodeBlock";
import { useTiming } from "./TimingContext";

export function PerformanceComparison() {
  const { serverTiming, clientTiming, nativeTiming } = useTiming();

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Performance Comparison
        </h2>
        <p className="text-gray-400">
          Native server components vs server prefetching vs client-only loading
        </p>
      </div>

      {/* Performance Timeline */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Loading Timeline
        </h3>

        <div className="space-y-6">
          {/* Native Server Component timeline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-purple-400">
                Native Server Component
              </span>
            </div>
            <div className="ml-7 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs text-gray-400 w-20">Timeline:</span>
                {nativeTiming.fallback > 0 &&
                nativeTiming.final > 0 ? (
                  <div className="flex items-center gap-0 w-full max-w-md">
                    {/* Suspense fallback bar */}
                    <div
                      className="h-4 bg-purple-300 rounded-l relative"
                      style={{
                        width: `${
                          (nativeTiming.fallback /
                            Math.max(serverTiming.final, clientTiming.final, nativeTiming.final)) *
                          100
                        }%`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs">
                        {Math.round(nativeTiming.fallback)}ms
                      </span>
                    </div>
                    {/* Content bar */}
                    <div
                      className="h-4 bg-gradient-to-r from-purple-500 to-purple-400 rounded-r relative"
                      style={{
                        width: `${
                          ((nativeTiming.final - nativeTiming.fallback) /
                            Math.max(serverTiming.final, clientTiming.final, nativeTiming.final)) *
                          100
                        }%`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                        {Math.round(nativeTiming.final - nativeTiming.fallback)}
                        ms
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-4 bg-gray-700 rounded relative animate-pulse">
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-xs">
                      measuring...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Server-side prefetching timeline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-400">
                Server Prefetch + Client SWR
              </span>
            </div>
            <div className="ml-7 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs text-gray-400 w-20">Timeline:</span>
                {serverTiming.fallback > 0 &&
                serverTiming.final > 0 ? (
                  <div className="flex items-center gap-0 w-full max-w-md">
                    {/* Fallback bar */}
                    <div
                      className="h-4 bg-yellow-500 rounded-l relative"
                      style={{
                        width: `${
                          (serverTiming.fallback /
                            Math.max(serverTiming.final, clientTiming.final, nativeTiming.final)) *
                          100
                        }%`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs">
                        {Math.round(serverTiming.fallback)}ms
                      </span>
                    </div>
                    {/* Content bar */}
                    <div
                      className="h-4 bg-gradient-to-r from-green-500 to-green-400 rounded-r relative"
                      style={{
                        width: `${
                          ((serverTiming.final - serverTiming.fallback) /
                            Math.max(serverTiming.final, clientTiming.final, nativeTiming.final)) *
                          100
                        }%`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                        {Math.round(serverTiming.final - serverTiming.fallback)}
                        ms
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-4 bg-gray-700 rounded relative animate-pulse">
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-xs">
                      measuring...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Client-only timeline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-400">
                Client-Only Loading
              </span>
            </div>
            <div className="ml-7 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs text-gray-400 w-20">Timeline:</span>
                {clientTiming.fallback > 0 &&
                clientTiming.final > 0 ? (
                  <div className="flex items-center gap-0 w-full max-w-md">
                    {/* Fallback bar */}
                    <div
                      className="h-4 bg-orange-500 rounded-l relative"
                      style={{
                        width: `${
                          (clientTiming.fallback /
                            Math.max(serverTiming.final, clientTiming.final, nativeTiming.final)) *
                          100
                        }%`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs">
                        {Math.round(clientTiming.fallback)}ms
                      </span>
                    </div>
                    {/* Content bar */}
                    <div
                      className="h-4 bg-blue-500 rounded-r relative"
                      style={{
                        width: `${
                          ((clientTiming.final - clientTiming.fallback) /
                            Math.max(serverTiming.final, clientTiming.final, nativeTiming.final)) *
                          100
                        }%`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                        {Math.round(clientTiming.final - clientTiming.fallback)}
                        ms
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-4 bg-gray-700 rounded relative animate-pulse">
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-xs">
                      measuring...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-green-400 mt-0.5">⚡</div>
            <div>
              <div className="font-medium text-white">Performance Impact</div>
              <div className="text-sm text-gray-300 mt-1">
                Server prefetching streams data during the initial page load,
                while client-only loading requires separate API requests after
                hydration. This eliminates request waterfalls and improves Core
                Web Vitals (LCP, CLS).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <CodeBlock
              title="🔥 Native Server Component"
              code={`// NativePokemonDemo.tsx (Server Component)
import { fetchPokemonByGeneration } from "@/app/lib/pokemon-api";

export async function NativePokemonDemo() {
  // Direct server-side fetch, no caching
  const data = await fetchPokemonByGeneration(1);

  return (
    <div>
      {data?.map(poke => (
        <img
          key={poke.id}
          src={poke.sprites.front_default}
          alt={poke.name}
          elementtiming={index === 0 ? "native-final" : undefined}
        />
      ))}
    </div>
  );
}

// Usage with Suspense
// <Suspense fallback={<NativePokemonFallback />}>
//   <NativePokemonDemo />
// </Suspense>`}
            />

            <CodeBlock
              title="🚀 Server Prefetch + Client SWR"
              code={`// app/page.tsx (Server Component)
import { prefetch, PreloadBoundary } from "@swr-next/server";
import { pokemon } from "./lib/resources/pokemon";

export default async function Page() {
  // Fetch during SSR
  const prefetched = prefetch(pokemon, { generation: 1 });
  
  return (
    <PreloadBoundary items={[prefetched]}>
      <PokemonGrid /> {/* Instant hydration */}
    </PreloadBoundary>
  );
}

// PokemonGrid.tsx (Client Component)
"use client";
import { usePreloadedSWR } from "@swr-next/client";

export function PokemonGrid() {
  // Data available immediately
  const { data } = usePreloadedSWR(pokemon, { generation: 1 });
  
  return (
    <div>
      {data?.map(poke => <PokemonCard key={poke.id} {...poke} />)}
    </div>
  );
}`}
            />

            <CodeBlock
              title="🐌 Client-Only SWR"
              code={`// ClientOnlyGrid.tsx
"use client";
import { useLazySWR } from "@swr-next/client";
import { useEffect, useState } from "react";

export function ClientOnlyGrid() {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true); // Hydration complete
  }, []);

  // Only starts fetching AFTER hydration
  const { data, isLoading } = useLazySWR(
    pokemon,
    { generation: 1 },
    { auto: hydrated } // Wait for hydration
  );

  if (!hydrated) return <div>Hydrating...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map(poke => <PokemonCard key={poke.id} {...poke} />)}
    </div>
  );
}`}
            />
        </div>
      </div>
    </section>
  );
}
