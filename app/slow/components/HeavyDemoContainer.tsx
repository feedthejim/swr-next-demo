import { HeavyNativePokemonSection } from "./HeavyNativePokemonSection";
import { HeavyPreloadedPokemonSection } from "./HeavyPreloadedPokemonSection";
import { HeavyLazyPokemonSection } from "./HeavyLazyPokemonSection";
import { HeavyPerformanceComparison } from "./HeavyPerformanceComparison";
import { HeavyServerPokemonWrapper } from "./HeavyServerPokemonWrapper";
import { TimingProvider } from "@/app/components/TimingContext";

export function HeavyDemoContainer() {
  return (
    <TimingProvider>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <HeavyNativePokemonSection />
          
          <HeavyPreloadedPokemonSection>
            <HeavyServerPokemonWrapper />
          </HeavyPreloadedPokemonSection>

          <HeavyLazyPokemonSection />
        </div>

        <HeavyPerformanceComparison />
      </div>
    </TimingProvider>
  );
}