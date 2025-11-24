"use client";

import { useEffect } from "react";

export function LazyPokemonFallback() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.__recordElementTiming) {
      window.__recordElementTiming("client-fallback");
    }
  }, []);

  return (
    <div className="space-y-4">
        <p className="text-sm text-orange-400 font-medium" elementtiming="client-fallback">
          🔄 Waiting for hydration...
        </p>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-800 rounded-xl opacity-50 animate-pulse"
            />
          ))}
        </div>
    </div>
  );
}