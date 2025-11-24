"use client";

import { CodeBlock } from "@/app/components/CodeBlock";
import { useTiming } from "@/app/components/TimingContext";

export function HeavyPerformanceComparison() {
  const { serverTiming, clientTiming, nativeTiming } = useTiming();
  
  // Calculate the maximum total time for relative scaling
  const maxTotalTime = Math.max(
    serverTiming.final || 0,
    clientTiming.final || 0,
    nativeTiming.final || 0
  );

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Performance Comparison
        </h2>
        <p className="text-gray-400">
          Data transfer measurement with detailed Pokemon data
        </p>
      </div>

      {/* Performance Timeline */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Loading Timeline
        </h3>
        <div className="text-xs text-gray-400 mb-6 text-center">
          Each timeline shows: <span className="text-gray-300">Fallback time</span> + <span className="text-gray-300">Content rendering time</span>
        </div>

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
                  <div className="flex items-center gap-0 flex-1">
                    {/* Suspense fallback bar */}
                    <div
                      className="h-4 bg-purple-300 rounded-l relative"
                      style={{
                        width: `${
                          (nativeTiming.fallback / maxTotalTime) * 100
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
                          ((nativeTiming.final - nativeTiming.fallback) / maxTotalTime) * 100
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
                  <div className="flex items-center gap-0 flex-1">
                    {/* Fallback bar */}
                    <div
                      className="h-4 bg-yellow-500 rounded-l relative"
                      style={{
                        width: `${
                          (serverTiming.fallback / maxTotalTime) * 100
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
                          ((serverTiming.final - serverTiming.fallback) / maxTotalTime) * 100
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
                Client-Only SWR
              </span>
            </div>
            <div className="ml-7 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs text-gray-400 w-20">Timeline:</span>
                {clientTiming.fallback > 0 &&
                clientTiming.final > 0 ? (
                  <div className="flex items-center gap-0 flex-1">
                    {/* Fallback bar */}
                    <div
                      className="h-4 bg-orange-500 rounded-l relative"
                      style={{
                        width: `${
                          (clientTiming.fallback / maxTotalTime) * 100
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
                          ((clientTiming.final - clientTiming.fallback) / maxTotalTime) * 100
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
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <CodeBlock
            title="🔥 Native: Efficient for Heavy Data"
            code={`// Server Component - No data transfer waste
export async function HeavyNative() {
  // Fetch ALL the data on server
  const allPokemon = await fetchHeavyData();
  
  // Only display what's needed
  const displayed = allPokemon.slice(0, 12);
  
  // Client only receives rendered HTML
  return (
    <div>
      {displayed.map(pokemon => 
        <PokemonCard key={pokemon.id} {...pokemon} />
      )}
    </div>
  );
}`}
          />

          <CodeBlock
            title="🚀 Prefetch: Fast but Wasteful"
            code={`// Prefetch approach - Fast but transfers all data
const prefetched = prefetch(heavyPokemon, {
  generations: [1, 2, 3] // 150+ Pokemon
});

// Client Component receives ALL data
function HeavyPreload() {
  const { data } = usePreloadedSWR(heavyPokemon, ...);
  
  // Only shows 12, but client has all 150+
  return data?.slice(0, 12).map(pokemon => 
    <PokemonCard key={pokemon.id} {...pokemon} />
  );
}`}
          />

          <CodeBlock
            title="🐌 Client: Slow and Wasteful"
            code={`// Client-only - Downloads after hydration
function HeavyClient() {
  const { data, isLoading } = useLazySWR(
    heavyPokemon, 
    { generations: [1, 2, 3] },
    { auto: true }
  );
  
  if (isLoading) return <Loading />;
  
  // Shows 12 but downloaded all 150+
  return data?.slice(0, 12).map(pokemon => 
    <PokemonCard key={pokemon.id} {...pokemon} />
  );
}`}
          />
        </div>
      </div>
    </section>
  );
}