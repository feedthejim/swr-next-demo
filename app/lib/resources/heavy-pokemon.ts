// Heavy Pokemon resource for /slow demo
import { defineResource } from "@swr-next";
import { fetchHeavyPokemonByGenerations, type HeavyPokemonData } from "../heavy-pokemon-api";

export const heavyPokemon = defineResource<{ generations: number[] }, HeavyPokemonData[]>({
  key: (params) =>
    params && params.generations.length > 0 ? ["heavy-pokemon", ...params.generations] : null,
  server: async ({ generations }) => {
    return fetchHeavyPokemonByGenerations(generations);
  },
  client: async ({ generations }, { signal } = {}) => {
    const response = await fetch(`/api/heavy-pokemon?generations=${generations.join(',')}`, {
      signal,
    });
    if (!response.ok) throw new Error("Failed to fetch heavy Pokemon data");
    return response.json();
  },
});