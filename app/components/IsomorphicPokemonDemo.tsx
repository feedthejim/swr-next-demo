"use client";

import { useIsomorphicSWR } from "@swr-next/isomorphic/use-isomorphic-swr";
import { pokemon } from "@/app/lib/resources/pokemon";

export function IsomorphicPokemonDemo() {
  // Execute performance mark directly during render
  if (typeof window !== 'undefined') {
    if (
      !performance
        .getEntriesByType("mark")
        .find((m) => m.name === "isomorphic-final-rendered")
    ) {
      performance.mark("isomorphic-final-rendered");
    }
  }

  const { data } = useIsomorphicSWR(pokemon, { generation: 1 });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-300">
          ✅ Loaded {data?.length} Pokemon (Generation 1)
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {data?.slice(0, 8).map((poke) => (
          <div
            key={poke.id}
            className="group relative aspect-square bg-gray-800 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-200 hover:scale-105"
          >
            <img
              src={poke.sprites.front_default}
              alt={poke.name}
              className="w-full h-full object-contain p-2"
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
  );
}