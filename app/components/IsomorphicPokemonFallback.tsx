"use client";

export function IsomorphicPokemonFallback() {
  // Execute performance mark directly during render
  if (typeof window !== 'undefined') {
    if (
      !performance
        .getEntriesByType("mark")
        .find((m) => m.name === "isomorphic-fallback-rendered")
    ) {
      performance.mark("isomorphic-fallback-rendered");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-purple-400 font-medium">
          🔄 Loading isomorphically...
        </div>
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