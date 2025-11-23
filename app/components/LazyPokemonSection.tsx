"use client";

import { Suspense } from "react";
import { LazyPokemonDemo } from "./LazyPokemonDemo";
import { LazyPokemonFallback } from "./LazyPokemonFallback";

export function LazyPokemonSection() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Client-Only Loading
        </h2>
        <p className="text-gray-400">
          Data fetched only after hydration - notice the delay
        </p>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Client SWR</h3>
          <Suspense fallback={<LazyPokemonFallback />}>
            <LazyPokemonDemo />
          </Suspense>
        </div>
      </div>
    </section>
  );
}