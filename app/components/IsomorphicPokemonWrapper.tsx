import { IsomorphicSwrProvider } from "@swr-next/isomorphic";
import { IsomorphicPokemonSection } from "./IsomorphicPokemonSection";

export function IsomorphicPokemonWrapper() {
  return (
    <IsomorphicSwrProvider>
      <IsomorphicPokemonSection />
    </IsomorphicSwrProvider>
  );
}