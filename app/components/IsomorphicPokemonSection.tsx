"use client";

import { Suspense } from "react";
import { IsomorphicPokemonDemo } from "./IsomorphicPokemonDemo";
import { IsomorphicPokemonFallback } from "./IsomorphicPokemonFallback";

export function IsomorphicPokemonSection() {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Isomorphic SWR</h3>
        <div className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded border border-purple-500/30">
          universal
        </div>
      </div>

      <div className="space-y-3">
        <Suspense fallback={<IsomorphicPokemonFallback />}>
          <IsomorphicPokemonDemo />
        </Suspense>
      </div>
    </div>
  );
}