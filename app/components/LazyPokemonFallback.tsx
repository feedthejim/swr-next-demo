"use client";

export function LazyPokemonFallback() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `performance.mark('client-fallback-rendered');`,
        }}
      />
      <div className="space-y-4">
        <div className="text-sm text-orange-400 font-medium">
          🔄 Waiting for hydration...
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-800 rounded-xl opacity-50 animate-pulse"
            />
          ))}
        </div>
      </div>
    </>
  );
}