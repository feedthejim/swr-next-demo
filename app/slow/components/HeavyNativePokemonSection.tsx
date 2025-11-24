import { Suspense } from "react";
import { HeavyNativePokemonDemo } from "./HeavyNativePokemonDemo";
import { HeavyNativePokemonFallback } from "./HeavyNativePokemonFallback";

export function HeavyNativePokemonSection() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">
          Native Server Component
        </h2>
        <p className="text-sm text-gray-400">
          Renders displayed Pokemon on server, sends HTML to client
        </p>
      </div>

      <div className="flex-1">
        <Suspense fallback={<HeavyNativePokemonFallback />}>
          <HeavyNativePokemonDemo />
        </Suspense>
      </div>
    </div>
  );
}