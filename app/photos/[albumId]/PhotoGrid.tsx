"use client";
import { usePreloadedSWR } from "@swr-next/client";
import { photos } from "@/app/lib/resources/photos";

export function PhotoGrid({ albumId }: { albumId: number }) {
  const { data, error, isLoading, mutate } = usePreloadedSWR(
    photos,
    { albumId },
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
    }
  );

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-red-800 font-semibold mb-2">Error Loading Photos</h2>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={() => mutate()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Loaded {data?.length || 0} photos
        </p>
        <button
          onClick={() => mutate()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data?.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 hover:shadow-lg transition-shadow"
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all">
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">
                  {photo.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          🚀 swr-next Features Demonstrated:
        </h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Server-side prefetching with React Server Components</li>
          <li>• Seamless hydration with prefetched data</li>
          <li>• SWR revalidation on focus and interval</li>
          <li>• Optimistic updates and error handling</li>
          <li>• TypeScript safety across boundaries</li>
        </ul>
      </div>
    </div>
  );
}