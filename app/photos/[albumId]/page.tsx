import { prefetch, PreloadBoundary } from "@swr-next/server";
import { photos } from "@/app/lib/resources/photos";
import { PhotoGrid } from "./PhotoGrid";

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;
  const albumIdNum = parseInt(albumId);

  if (isNaN(albumIdNum) || albumIdNum < 1 || albumIdNum > 10) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Invalid Album ID
          </h1>
          <p className="text-gray-600 mb-4">
            Please choose an album ID between 1 and 10
          </p>
          <a
            href="/"
            className="text-blue-600 hover:underline"
          >
            Go back home
          </a>
        </div>
      </div>
    );
  }

  const prefetchedPhotos = prefetch(photos, { albumId: albumIdNum });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <a
            href="/"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to home
          </a>
          <h1 className="text-3xl font-bold text-gray-900">
            Album {albumId} Photos
          </h1>
          <p className="text-gray-600 mt-2">
            Server-side prefetched with client-side SWR revalidation
          </p>
        </div>

        <PreloadBoundary items={[prefetchedPhotos]}>
          <PhotoGrid albumId={albumIdNum} />
        </PreloadBoundary>
      </div>
    </div>
  );
}