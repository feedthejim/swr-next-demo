interface HeavyPreloadedPokemonSectionProps {
  children: React.ReactNode;
}

export function HeavyPreloadedPokemonSection({ children }: HeavyPreloadedPokemonSectionProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">
          Server Prefetched + Client SWR
        </h2>
        <p className="text-sm text-gray-400">
          Transmits all JSON data to client for hydration
        </p>
      </div>

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}