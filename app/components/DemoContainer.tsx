import { PreloadedPokemonSection } from "./PreloadedPokemonSection";
import { LazyPokemonSection } from "./LazyPokemonSection";
import { PerformanceComparison } from "./PerformanceComparison";
import { ServerPokemonWrapper } from "./ServerPokemonWrapper";
import { TimingProvider } from "./TimingContext";

export function DemoContainer() {
  return (
    <TimingProvider>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <PreloadedPokemonSection>
            <ServerPokemonWrapper />
          </PreloadedPokemonSection>

          <LazyPokemonSection />
        </div>

        <PerformanceComparison />
      </div>
    </TimingProvider>
  );
}
