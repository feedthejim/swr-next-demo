// Shared Pokemon API utility to avoid code duplication

export type PokemonDisplayData = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

export async function fetchPokemonByGeneration(generation: number): Promise<PokemonDisplayData[]> {
  const limit = 8; // Only fetch what we display
  const offset = (generation - 1) * limit;
  
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Fetch detailed data for each Pokemon in parallel
  const detailPromises = data.results.map(async (p: any) => {
    const detailResponse = await fetch(p.url);
    if (!detailResponse.ok) {
      throw new Error(`Failed to fetch Pokemon details: ${detailResponse.status}`);
    }
    const detail = await detailResponse.json();
    
    // Only return the properties we actually display
    return {
      id: detail.id,
      name: detail.name,
      sprites: {
        front_default: detail.sprites.front_default,
      },
    };
  });
  
  return Promise.all(detailPromises);
}