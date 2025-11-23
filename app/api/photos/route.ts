import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const albumId = searchParams.get("albumId");

  if (!albumId) {
    return Response.json({ error: "albumId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const photos = await response.json();
    return Response.json(photos);
  } catch (error) {
    console.error("Photos API error:", error);
    return Response.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}