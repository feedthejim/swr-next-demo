import { prefetch, PreloadBoundary } from "@swr-next/server";
import { heavyPokemon } from "@/app/lib/resources/heavy-pokemon";
import { HeavyDemoContainer } from "./components/HeavyDemoContainer";

export default async function SlowPage() {
  // Server-side prefetch for heavy demo
  const prefetchedHeavyPokemon = prefetch(heavyPokemon, { generations: [1] });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-3">swr-next</h1>
            
            <div className="flex justify-center gap-2 mb-4">
              <a 
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Regular Demo
              </a>
              <div className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium">
                Heavy Data Demo
              </div>
            </div>

            <p className="text-lg text-gray-400 mb-4">
              Performance comparison with large datasets and detailed Pokemon data
            </p>
            
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
              <div className="text-sm text-gray-300 mb-2">
                📊 This demo fetches detailed data for 50 Pokemon (Generation 1)
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Native Server Component: Only transmits rendered HTML</div>
                <div>• Server Prefetch + SWR: Transmits all JSON data to client</div>
                <div>• Client-Only SWR: Downloads all data after hydration</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo */}
      <div className="container mx-auto px-4 py-16">
        <PreloadBoundary items={[prefetchedHeavyPokemon]}>
          <HeavyDemoContainer />
        </PreloadBoundary>
      </div>
    </div>
  );
}