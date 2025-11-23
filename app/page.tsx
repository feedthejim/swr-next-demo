import { prefetch, PreloadBoundary } from "@swr-next";
import { photos } from "@/app/lib/resources/photos";
import { DemoShowcase } from "./components/DemoShowcase";

export default async function Home() {
  // Server-side prefetch for immediate demo
  const prefetchedPhotos = prefetch(photos, { albumId: 1 });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 swr-next
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Universal React data fetching that bridges server-side rendering and client-side hydration with seamless SWR integration
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Server Components</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">SWR Integration</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">TypeScript</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full">Bundle Splitting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo */}
      <div className="container mx-auto px-4 py-8">
        <PreloadBoundary items={[prefetchedPhotos]}>
          <DemoShowcase />
        </PreloadBoundary>
      </div>
    </div>
  );
}
