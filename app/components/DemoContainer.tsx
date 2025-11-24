import { PreloadedPokemonSection } from "./PreloadedPokemonSection";
import { LazyPokemonSection } from "./LazyPokemonSection";
import { NativePokemonSection } from "./NativePokemonSection";
import { PerformanceComparison } from "./PerformanceComparison";
import { ServerPokemonWrapper } from "./ServerPokemonWrapper";
import { TimingProvider } from "./TimingContext";

export function DemoContainer() {
  return (
    <TimingProvider>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          <NativePokemonSection />
          
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
