// Server-only resource definition
import { defineResource } from "@swr-next/server";

type Photo = { id: number; title: string; thumbnailUrl: string };

export const photos = defineResource<{ albumId: number }, Photo[]>({
  key: ({ albumId }) => ["photos", albumId],
  server: async ({ albumId }) => {
    const r = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
      { cache: "no-store" }
    );
    return r.json();
  },
  client: async ({ albumId }, { signal }) => {
    const r = await fetch(`/api/photos?albumId=${albumId}`, { signal });
    if (!r.ok) throw new Error("client fetch failed");
    return r.json();
  },
});