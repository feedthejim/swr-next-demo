import { fetchHeavyPokemonByGenerations } from "@/app/lib/heavy-pokemon-api";

export async function HeavyNativePokemonDemo() {
  const data = await fetchHeavyPokemonByGenerations([1]);
  
  // Only display first 12 Pokemon
  const displayedPokemon = data.slice(0, 12);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Native Server Component</h3>
      </div>

      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-300">
            ✅ Showing {displayedPokemon.length} of {data.length} Pokemon
          </div>
        </div>
        
        
        <div className="grid grid-cols-4 gap-2">
          {displayedPokemon.map((poke, index) => (
            <div
              key={poke.id}
              className="group relative aspect-square bg-gray-800 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-200 hover:scale-105"
            >
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="w-full h-full object-contain p-2"
                elementtiming={index === 0 ? "native-final" : undefined}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-xl p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium capitalize truncate">
                  {poke.name}
                </p>
                <p className="text-gray-300 text-xs">
                  #{poke.id.toString().padStart(3, "0")}
                </p>
                <p className="text-gray-400 text-xs">
                  {poke.types.map(t => t.type.name).join('/')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}