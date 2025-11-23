import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const generation = searchParams.get("generation");

  if (!generation) {
    return Response.json({ error: "generation is required" }, { status: 400 });
  }

  try {
    const limit = 20;
    const offset = (parseInt(generation) - 1) * limit;
    
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Fetch detailed data for each Pokemon
    const detailPromises = data.results.map(async (p: any) => {
      const detailResponse = await fetch(p.url);
      return detailResponse.json();
    });
    
    const pokemon = await Promise.all(detailPromises);
    return Response.json(pokemon);
  } catch (error) {
    console.error("Pokemon API error:", error);
    return Response.json(
      { error: "Failed to fetch Pokemon" },
      { status: 500 }
    );
  }
}