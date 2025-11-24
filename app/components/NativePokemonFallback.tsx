export function NativePokemonFallback() {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Native Server Component</h3>
      </div>
      
      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-center">
          <p className="text-sm text-purple-400 font-medium" elementtiming="native-fallback">
            ⚡ Loading data on server...
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
    </div>
  );
}