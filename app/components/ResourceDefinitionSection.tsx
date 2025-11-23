"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

export function ResourceDefinitionSection() {
  const [showCode, setShowCode] = useState<string | null>(null);

  return (
    <>
      {/* Resource Definition */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Universal Resource Definition
          </h2>
          <p className="text-gray-400">One definition, works everywhere</p>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
          <button
            onClick={() =>
              setShowCode(showCode === "resource" ? null : "resource")
            }
            className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded mb-4 text-white border border-gray-600"
          >
            Show Resource Definition
          </button>

          {showCode === "resource" && (
            <CodeBlock
              title="lib/resources/pokemon.ts"
              code={`import { defineResource } from "@swr-next";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: Array<{
    type: { name: string };
  }>;
  height: number;
  weight: number;
};

export const pokemon = defineResource<{ generation: number }, Pokemon[]>({
  // Cache key function - null means no fetch
  key: (params) => (params && params.generation > 0) 
    ? ["pokemon", params.generation] 
    : null,
  
  // Server-side: direct API calls to PokeAPI
  server: async ({ generation }) => {
    const limit = 20;
    const offset = (generation - 1) * limit;
    
    const response = await fetch(
      \`https://pokeapi.co/api/v2/pokemon?limit=\${limit}&offset=\${offset}\`,
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
  
  // Client-side: API routes
  client: async ({ generation }, { signal } = {}) => {
    const response = await fetch(\`/api/pokemon?generation=\${generation}\`, { signal });
    if (!response.ok) throw new Error("Failed to fetch Pokemon");
    return response.json();
  },
});`}
            />
          )}
        </div>
      </section>

    </>
  );
}