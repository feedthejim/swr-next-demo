import { PreloadedPokemonSection } from "./PreloadedPokemonSection";
import { LazyPokemonSection } from "./LazyPokemonSection";
import { IsomorphicPokemonWrapper } from "./IsomorphicPokemonWrapper";
import { PerformanceComparison } from "./PerformanceComparison";
import { ServerPokemonWrapper } from "./ServerPokemonWrapper";
import { TimingProvider } from "./TimingContext";

export function DemoContainer() {
  return (
    <TimingProvider>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid lg:grid-cols-3 gap-6">
          <PreloadedPokemonSection>
            <ServerPokemonWrapper />
          </PreloadedPokemonSection>

          <IsomorphicPokemonWrapper />

          <LazyPokemonSection />
        </div>

        <PerformanceComparison />
      </div>
    </TimingProvider>
  );
}
