// app/lib/resources/pokemon.ts
import { defineResource } from "@swr-next";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
};

export const pokemon = defineResource<{ generation: number }, Pokemon[]>({
  key: (params) => (params && params.generation > 0) ? ["pokemon", params.generation] : null,
  server: async ({ generation }) => {
    // Fetch Pokemon from different generations (1-9)
    const limit = 20;
    const offset = (generation - 1) * limit;
    
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    
    // Fetch detailed data for each Pokemon
    const detailPromises = data.results.map(async (p: any) => {
      const detailResponse = await fetch(p.url);
      return detailResponse.json();
    });
    
    return Promise.all(detailPromises);
  },
  client: async ({ generation }, { signal } = {}) => {
    const response = await fetch(`/api/pokemon?generation=${generation}`, { signal });
    if (!response.ok) throw new Error("Failed to fetch Pokemon");
    return response.json();
  },
});
