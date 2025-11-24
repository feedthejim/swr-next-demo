// app/lib/resources/pokemon.ts
import { defineResource } from "@swr-next";
import { fetchPokemonByGeneration, type PokemonDisplayData } from "../pokemon-api";

export const pokemon = defineResource<{ generation: number }, PokemonDisplayData[]>({
  key: (params) =>
    params && params.generation > 0 ? ["pokemon", params.generation] : null,
  server: async ({ generation }) => {
    return fetchPokemonByGeneration(generation);
  },
  client: async ({ generation }, { signal } = {}) => {
    const response = await fetch(`/api/pokemon?generation=${generation}`, {
      signal,
    });
    if (!response.ok) throw new Error("Failed to fetch Pokemon");
    return response.json();
  },
});
