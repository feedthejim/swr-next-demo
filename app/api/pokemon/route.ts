import { NextRequest } from "next/server";
import { fetchPokemonByGeneration } from "@/app/lib/pokemon-api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const generation = searchParams.get("generation");

  if (!generation) {
    return Response.json({ error: "generation is required" }, { status: 400 });
  }

  try {
    const generationNum = parseInt(generation);
    if (isNaN(generationNum) || generationNum < 1) {
      return Response.json({ error: "generation must be a positive number" }, { status: 400 });
    }

    const pokemon = await fetchPokemonByGeneration(generationNum);
    return Response.json(pokemon);
  } catch (error) {
    console.error("Pokemon API error:", error);
    return Response.json(
      { error: "Failed to fetch Pokemon" },
      { status: 500 }
    );
  }
}