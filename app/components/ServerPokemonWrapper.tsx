import { Suspense } from "react";
import { PreloadedPokemonDemo } from "./PreloadedPokemonDemo";
import { PreloadedPokemonFallback } from "./PreloadedPokemonFallback";
import { connection } from "next/server";

async function PreloadedPokemonWithConnection() {
  await connection();

  return <PreloadedPokemonDemo />;
}

export function ServerPokemonWrapper() {
  return (
    <Suspense fallback={<PreloadedPokemonFallback />}>
      <PreloadedPokemonWithConnection />
    </Suspense>
  );
}
