export function HeavyNativePokemonFallback() {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Native Server Component</h3>
      </div>
      
      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-start">
          <p className="text-sm text-purple-400 font-medium flex-1 pr-2" elementtiming="native-fallback">
            ⚡ Fetching 50 Pokemon on server...
          </p>
          <div className="text-xs text-blue-400 font-mono whitespace-nowrap">
            Time to fallback: measuring...
          </div>
        </div>

        <div className="text-xs text-gray-400 space-y-1 mb-4">
          <div>📊 Fetching 50 Pokemon with full details</div>
          <div>📤 Will transmit only rendered HTML</div>
          <div>🎯 Server-side rendering in progress...</div>
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