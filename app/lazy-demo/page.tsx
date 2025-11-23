import { LazyPhotoDemo } from "./LazyPhotoDemo";

export default function LazyDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <a
            href="/"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to home
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lazy Loading Demo
          </h1>
          <p className="text-gray-600">
            Demonstrates manual data fetching with{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">useLazySWR</code>
          </p>
        </div>

        <LazyPhotoDemo />
      </div>
    </div>
  );
}