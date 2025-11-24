import { Suspense } from "react";
import { NativePokemonDemo } from "./NativePokemonDemo";
import { NativePokemonFallback } from "./NativePokemonFallback";

export function NativePokemonSection() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">
          Native Server Component
        </h2>
        <p className="text-sm text-gray-400">
          Direct server-side fetch with React Suspense
        </p>
      </div>

      <div className="flex-1">
        <Suspense fallback={<NativePokemonFallback />}>
          <NativePokemonDemo />
        </Suspense>
      </div>
    </div>
  );
}