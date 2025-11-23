"use client";

export function PreloadedPokemonFallback() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `performance.mark('server-fallback-rendered');`,
        }}
      />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-yellow-400 font-medium">
            ⚡ Streaming from server...
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
    </>
  );
}
