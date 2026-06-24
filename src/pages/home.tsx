import { Hero } from "@/components/sections/hero"
import { StatsBar } from "@/components/sections/stats-bar"
import { JourneySteps } from "@/components/sections/journey-steps"
import { PathwayExplorer } from "@/components/sections/pathway-explorer"
import { CareSection } from "@/components/sections/care-section"
import { Testimonials } from "@/components/sections/testimonials"
import { FinalCta } from "@/components/sections/final-cta"

export function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <JourneySteps />
      <PathwayExplorer />
      <CareSection />
      <Testimonials />
      <FinalCta />
    </>
  )
}
