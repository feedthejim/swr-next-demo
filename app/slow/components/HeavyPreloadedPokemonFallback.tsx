"use client";

import { useEffect } from "react";

export function HeavyPreloadedPokemonFallback() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.__recordElementTiming) {
      window.__recordElementTiming("server-fallback");
    }
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Server Prefetched + Client SWR</h3>
      </div>
      
      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-start">
          <p className="text-sm text-yellow-400 font-medium flex-1 pr-2" elementtiming="server-fallback">
            ⚡ Streaming prefetched data...
          </p>
          <div className="text-xs text-blue-400 font-mono whitespace-nowrap">
            Time to fallback: measuring...
          </div>
        </div>

        <div className="text-xs text-gray-400 space-y-1 mb-4">
          <div>📊 All Pokemon JSON will be sent to client</div>
          <div>📤 Full data included for SWR hydration</div>
          <div>⚠️ Over-fetching for client-side caching</div>
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
    </div>
  );
}