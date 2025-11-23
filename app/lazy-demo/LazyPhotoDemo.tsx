"use client";
import { useState } from "react";
import { useLazySWR } from "@swr-next/client";
import { photos } from "@/app/lib/resources/photos";

export function LazyPhotoDemo() {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [autoRevalidate, setAutoRevalidate] = useState(false);

  const { data, error, isLoading, reload } = useLazySWR(
    photos,
    selectedAlbum ? { albumId: selectedAlbum } : null,
    { 
      auto: autoRevalidate,
      revalidateOnFocus: autoRevalidate,
    }
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Controls</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Album
            </label>
            <select
              value={selectedAlbum || ""}
              onChange={(e) => setSelectedAlbum(Number(e.target.value) || null)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Choose album...</option>
              {[1, 2, 3, 4, 5].map(id => (
                <option key={id} value={id}>Album {id}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto Revalidate
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoRevalidate}
                onChange={(e) => setAutoRevalidate(e.target.checked)}
                className="mr-2"
              />
              Enable auto-revalidation
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manual Actions
            </label>
            <button
              onClick={reload}
              disabled={!selectedAlbum || isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Reload Photos"}
            </button>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium">Status:</span>{" "}
            <span className={`${
              isLoading ? "text-yellow-600" : 
              error ? "text-red-600" : 
              data ? "text-green-600" : "text-gray-600"
            }`}>
              {isLoading ? "Loading" : error ? "Error" : data ? "Loaded" : "Idle"}
            </span>
          </div>
          <div>
            <span className="font-medium">Album:</span> {selectedAlbum || "None"}
          </div>
          <div>
            <span className="font-medium">Photos:</span> {data?.length || 0}
          </div>
          <div>
            <span className="font-medium">Auto:</span> {autoRevalidate ? "On" : "Off"}
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button
            onClick={reload}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Photo Grid */}
      {data && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">
            Photos from Album {selectedAlbum}
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {data.slice(0, 24).map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 hover:shadow-lg transition-shadow"
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity text-center p-1">
                    {photo.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {data.length > 24 && (
            <p className="text-gray-600 text-sm mt-4">
              Showing first 24 of {data.length} photos
            </p>
          )}
        </div>
      )}

      {/* Features */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">
          🎯 useLazySWR Features:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
          <ul className="space-y-1">
            <li>• Manual data fetching control</li>
            <li>• Conditional fetching (null key = no fetch)</li>
            <li>• Auto-revalidation toggle</li>
            <li>• Manual reload functionality</li>
          </ul>
          <ul className="space-y-1">
            <li>• SWR caching and deduplication</li>
            <li>• Error handling and retry</li>
            <li>• Loading states</li>
            <li>• No server prefetch required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}