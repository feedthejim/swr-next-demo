// Heavy Pokemon API that fetches much more detailed data for /slow demo

export type HeavyPokemonData = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
};

export async function fetchHeavyPokemonByGenerations(generations: number[]): Promise<HeavyPokemonData[]> {
  const allPokemon: HeavyPokemonData[] = [];
  
  for (const generation of generations) {
    // Fetch reasonable amounts - 50 Pokemon per generation is enough to demonstrate the point
    const limit = 50;
    const offset = (generation - 1) * 50;
    
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      { cache: "no-store" }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list for generation ${generation}: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Fetch detailed data for each Pokemon in parallel (smaller batches to be nice to API)
    const batchSize = 10;
    for (let i = 0; i < data.results.length; i += batchSize) {
      const batch = data.results.slice(i, i + batchSize);
      const batchPromises = batch.map(async (p: any) => {
        try {
          const detailResponse = await fetch(p.url);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch Pokemon details: ${detailResponse.status}`);
          }
          const detail = await detailResponse.json();
          
          // Return ALL the detailed data (this will be heavy!)
          return {
            id: detail.id,
            name: detail.name,
            height: detail.height,
            weight: detail.weight,
            base_experience: detail.base_experience,
            sprites: {
              front_default: detail.sprites.front_default,
              back_default: detail.sprites.back_default,
              front_shiny: detail.sprites.front_shiny,
              back_shiny: detail.sprites.back_shiny,
            },
            types: detail.types,
            abilities: detail.abilities,
            stats: detail.stats,
            moves: detail.moves, // This is VERY heavy - can be 100+ moves per Pokemon
            game_indices: detail.game_indices,
          } as HeavyPokemonData;
        } catch (error) {
          console.warn(`Failed to fetch Pokemon ${p.name}:`, error);
          return null;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      allPokemon.push(...batchResults.filter(Boolean) as HeavyPokemonData[]);
      
      // Small delay between batches to be nice to the API
      if (i + batchSize < data.results.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }
  
  return allPokemon;
}