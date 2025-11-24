import { Suspense } from "react";
import { HeavyPreloadedPokemonDemo } from "./HeavyPreloadedPokemonDemo";
import { HeavyPreloadedPokemonFallback } from "./HeavyPreloadedPokemonFallback";
import { connection } from "next/server";

async function HeavyPreloadedPokemonWithConnection() {
  await connection();
  return <HeavyPreloadedPokemonDemo />;
}

export function HeavyServerPokemonWrapper() {
  return (
    <Suspense fallback={<HeavyPreloadedPokemonFallback />}>
      <HeavyPreloadedPokemonWithConnection />
    </Suspense>
  );
}