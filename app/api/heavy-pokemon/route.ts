import { fetchHeavyPokemonByGenerations } from "@/app/lib/heavy-pokemon-api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const generationsParam = searchParams.get("generations");

  if (!generationsParam) {
    return Response.json(
      { error: "generations parameter is required" },
      { status: 400 }
    );
  }

  try {
    const generations = generationsParam.split(',').map(Number);
    const pokemonData = await fetchHeavyPokemonByGenerations(generations);
    
    // Add content-length header to show data size
    const response = Response.json(pokemonData);
    const dataSize = JSON.stringify(pokemonData).length;
    response.headers.set('X-Data-Size', dataSize.toString());
    response.headers.set('X-Pokemon-Count', pokemonData.length.toString());
    
    return response;
  } catch (error) {
    console.error("Error fetching heavy Pokemon data:", error);
    return Response.json(
      { error: "Failed to fetch Pokemon data" },
      { status: 500 }
    );
  }
}