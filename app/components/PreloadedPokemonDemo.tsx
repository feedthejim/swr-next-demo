"use client";

import { usePreloadedSWR } from "@swr-next/client";
import { pokemon } from "@/app/lib/resources/pokemon";
import { useEffect } from "react";

export function PreloadedPokemonDemo() {
  const {
    data: preloadedData,
    // there is a bug here where isLoading is true even when the data is loaded, but only on the second render
    isLoading,
  } = usePreloadedSWR(pokemon, { generation: 1 });

  useEffect(() => {
    if (preloadedData && typeof window !== "undefined" && window.__recordElementTiming) {
      window.__recordElementTiming("server-final");
    }
  }, [preloadedData]);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Server SWR</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-300">
              ✅ Loaded {preloadedData?.length} Pokemon (Generation 1)
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {preloadedData?.map((poke, index) => (
              <div
                key={poke.id}
                className="group relative aspect-square bg-gray-800 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-200 hover:scale-105"
              >
                <img
                  src={poke.sprites.front_default}
                  alt={poke.name}
                  className="w-full h-full object-contain p-2"
                  elementtiming={index === 0 ? "server-final" : undefined}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-xl p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium capitalize truncate">
                    {poke.name}
                  </p>
                  <p className="text-gray-300 text-xs">
                    #{poke.id.toString().padStart(3, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
