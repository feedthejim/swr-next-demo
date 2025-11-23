import { prefetch, PreloadBoundary } from "@swr-next/server";
import { pokemon } from "@/app/lib/resources/pokemon";
import { DemoContainer } from "./components/DemoContainer";
import { ResourceDefinitionSection } from "./components/ResourceDefinitionSection";

export default async function Home() {
  // Server-side prefetch for immediate demo
  const prefetchedPokemon = prefetch(pokemon, { generation: 1 });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            
            <h1 className="text-4xl font-bold text-white mb-3">
              swr-next
            </h1>
            
            <p className="text-lg text-gray-400 mb-4">
              Server-side data fetching with client-side SWR
            </p>
          </div>
        </div>
      </div>

      {/* Demo */}
      <div className="container mx-auto px-4 py-16">
        <PreloadBoundary items={[prefetchedPokemon]}>
          <DemoContainer />
        </PreloadBoundary>
        
        <div className="max-w-6xl mx-auto mt-12">
          <ResourceDefinitionSection />
        </div>
      </div>
    </div>
  );
}
