"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { useTiming } from "./TimingContext";

export function PerformanceComparison() {
  const { serverTiming, clientTiming, isomorphicTiming } = useTiming();
  const [showCode, setShowCode] = useState<string | null>("comparison");
  console.log("results", serverTiming, clientTiming, isomorphicTiming);
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Performance Comparison
        </h2>
        <p className="text-gray-400">
          Server prefetching vs isomorphic vs client-only loading timeline
        </p>
      </div>

      {/* Performance Timeline */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Loading Timeline
        </h3>

        <div className="space-y-6">
          {/* Server-side prefetching timeline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-400">
                Server Prefetching
              </span>
            </div>
            <div className="ml-7 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs text-gray-400 w-20">Timeline:</span>
                {serverTiming.fallback > 0 &&
                serverTiming.final > 0 &&
                clientTiming.final > 0 ? (
                  <div className="flex items-center gap-0 w-full max-w-md">
                    {/* Fallback bar */}
                    <div
                      className="h-4 bg-yellow-500 rounded-l relative"
                      style={{
                        width: `${
                          (serverTiming.fallback /
                            Math.max(serverTiming.final, clientTiming.final, isomorphicTiming.final)) *
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
                            Math.max(serverTiming.final, clientTiming.final, isomorphicTiming.final)) *
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

          {/* Isomorphic timeline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-purple-400">
                Isomorphic Loading
              </span>
            </div>
            <div className="ml-7 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs text-gray-400 w-20">Timeline:</span>
                {isomorphicTiming.fallback > 0 &&
                isomorphicTiming.final > 0 &&
                clientTiming.final > 0 ? (
                  <div className="flex items-center gap-0 w-full max-w-md">
                    {/* Fallback bar */}
                    <div
                      className="h-4 bg-purple-400 rounded-l relative"
                      style={{
                        width: `${
                          (isomorphicTiming.fallback /
                            Math.max(serverTiming.final, clientTiming.final, isomorphicTiming.final)) *
                          100
                        }%`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs">
                        {Math.round(isomorphicTiming.fallback)}ms
                      </span>
                    </div>
                    {/* Content bar */}
                    <div
                      className="h-4 bg-gradient-to-r from-purple-500 to-purple-400 rounded-r relative"
                      style={{
                        width: `${
                          ((isomorphicTiming.final - isomorphicTiming.fallback) /
                            Math.max(serverTiming.final, clientTiming.final, isomorphicTiming.final)) *
                          100
                        }%`,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                        {Math.round(isomorphicTiming.final - isomorphicTiming.fallback)}
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
                clientTiming.final > 0 &&
                serverTiming.final > 0 ? (
                  <div className="flex items-center gap-0 w-full max-w-md">
                    {/* Fallback bar */}
                    <div
                      className="h-4 bg-orange-500 rounded-l relative"
                      style={{
                        width: `${
                          (clientTiming.fallback /
                            Math.max(serverTiming.final, clientTiming.final, isomorphicTiming.final)) *
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
                            Math.max(serverTiming.final, clientTiming.final, isomorphicTiming.final)) *
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
                Server prefetching streams data during the initial page load. Isomorphic SWR 
                provides universal loading that works seamlessly on both server and client.
                Client-only loading requires separate API requests after hydration. 
                Server and isomorphic approaches eliminate request waterfalls and improve Core Web Vitals.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() =>
              setShowCode(showCode === "comparison" ? null : "comparison")
            }
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
          >
            Show Implementation Comparison
          </button>
        </div>

        {showCode === "comparison" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <CodeBlock
              title="🚀 Server Prefetching (Fast)"
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
              title="🐌 Client-Only (Slow)"
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
        )}
      </div>
    </section>
  );
}
