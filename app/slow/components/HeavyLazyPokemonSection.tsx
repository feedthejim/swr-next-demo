"use client";

import { Suspense } from "react";
import { HeavyLazyPokemonDemo } from "./HeavyLazyPokemonDemo";
import { HeavyLazyPokemonFallback } from "./HeavyLazyPokemonFallback";

export function HeavyLazyPokemonSection() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">
          Client-Only SWR
        </h2>
        <p className="text-sm text-gray-400">
          Downloads JSON after hydration completes
        </p>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Client SWR</h3>
        </div>
        <div className="flex-1">
          <Suspense fallback={<HeavyLazyPokemonFallback />}>
            <HeavyLazyPokemonDemo />
          </Suspense>
        </div>
      </div>
    </div>
  );
}