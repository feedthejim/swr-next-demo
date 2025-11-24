"use client";

import { useEffect } from "react";

export function PreloadedPokemonFallback() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.__recordElementTiming) {
      window.__recordElementTiming("server-fallback");
    }
  }, []);

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-yellow-400 font-medium" elementtiming="server-fallback">
            ⚡ Streaming from server...
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
