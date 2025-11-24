"use client";

import { useEffect } from "react";

export function HeavyLazyPokemonFallback() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.__recordElementTiming) {
      window.__recordElementTiming("client-fallback");
    }
  }, []);

  return (
    <div className="space-y-3 flex-1">
        <div className="flex justify-between items-start">
          <p className="text-sm text-orange-400 font-medium flex-1 pr-2" elementtiming="client-fallback">
            🔄 Downloading Pokemon data after hydration...
          </p>
          <div className="text-xs text-blue-400 font-mono whitespace-nowrap">
            Time to fallback: measuring...
          </div>
        </div>

        <div className="text-xs text-gray-400 space-y-1 mb-4">
          <div>📊 Fetching 50 Pokemon via API</div>
          <div>📤 Will download full JSON payload</div>
          <div>⚠️ Network request after page load</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-800 rounded-xl border border-gray-600 animate-pulse"
            />
          ))}
        </div>
    </div>
  );
}