"use client";

import { useEffect } from "react";

export function LazyPokemonFallback() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.__recordElementTiming) {
      window.__recordElementTiming("client-fallback");
    }
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm text-orange-400 font-medium" elementtiming="client-fallback">
          🔄 Loading data after hydration...
        </p>
        <div className="text-xs text-blue-400 font-mono">
          Time to content: measuring...
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-800 rounded-xl border border-gray-600 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}