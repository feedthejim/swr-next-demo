interface PreloadedPokemonSectionProps {
  children: React.ReactNode;
}

export function PreloadedPokemonSection({ children }: PreloadedPokemonSectionProps) {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Server Prefetching
        </h2>
        <p className="text-gray-400">
          Data fetched during SSR - instant content on page load
        </p>
      </div>

      {/* Live Demo - suspense boundary only around dynamic content */}
      {children}
    </section>
  );
}