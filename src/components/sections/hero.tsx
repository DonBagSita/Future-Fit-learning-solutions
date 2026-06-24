import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"
import {
  ContainerScroll,
  ContainerSticky,
  ContainerAnimated,
} from "@/components/blocks/scroll-container"
import { ToneFade } from "@/components/blocks/tone-fade"
import { Button } from "@/components/ui/button"
import { HeroIllustration } from "@/components/illustrations/hero-illustration"
import { useToneCopy } from "@/lib/tone-context"

export function Hero() {
  const copy = useToneCopy({
    learner: {
      eyebrow: "For every Grade 9 learner in Kenya",
      heading: "Grade 9 to Grade 10 doesn't have to feel like guesswork.",
      sub: "Answer a few honest questions about yourself. We'll help you find your pathway, your subjects, and schools that actually fit — before you have to decide anything.",
      cta: "Start your journey",
    },
    parent: {
      eyebrow: "For parents navigating CBC senior school",
      heading: "Help your child choose senior school with confidence, not pressure.",
      sub: "Future Fit guides your child through a structured, curriculum-aligned assessment — then shows you both the reasoning, in plain language, before any decision is made.",
      cta: "See how it works",
    },
  })

  return (
    <ContainerScroll className="h-[220vh] md:h-[230vh]">
      <ContainerSticky className="grain flex items-center overflow-hidden bg-gradient-to-b from-cream via-cream to-amber-50 px-5 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <ContainerAnimated inputRange={[0, 0.3]} outputRange={[30, 0]}>
              <ToneFade>
                <span className="inline-flex items-center gap-2 rounded-full bg-forest-50 px-4 py-1.5 text-sm font-semibold text-forest-700">
                  <Sparkles size={15} />
                  {copy.eyebrow}
                </span>
              </ToneFade>
            </ContainerAnimated>

            <ContainerAnimated
              inputRange={[0.05, 0.35]}
              outputRange={[40, 0]}
              transition={{ delay: 0.05 }}
            >
              <ToneFade>
                <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-navy-800 sm:text-5xl md:text-6xl">
                  {copy.heading}
                </h1>
              </ToneFade>
            </ContainerAnimated>

            <ContainerAnimated
              inputRange={[0.1, 0.4]}
              outputRange={[40, 0]}
              transition={{ delay: 0.1 }}
            >
              <ToneFade>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-700/80">
                  {copy.sub}
                </p>
              </ToneFade>
            </ContainerAnimated>

            <ContainerAnimated
              inputRange={[0.15, 0.45]}
              outputRange={[40, 0]}
              transition={{ delay: 0.15 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <ToneFade className="flex flex-wrap items-center gap-4">
                <Link to="/start">
                  <Button size="lg">
                    {copy.cta}
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="ghost">
                    See how it works
                  </Button>
                </Link>
              </ToneFade>
            </ContainerAnimated>

            <ContainerAnimated
              inputRange={[0.2, 0.5]}
              outputRange={[30, 0]}
              transition={{ delay: 0.2 }}
              className="mt-10 flex items-center gap-3 text-sm font-medium text-navy-700/70"
            >
              <span className="inline-flex h-8 items-center rounded-full bg-amber-100 px-3 font-bold text-amber-700">
                Free
              </span>
              for the first 200 Grade 9 learners
            </ContainerAnimated>
          </div>

          <ContainerAnimated
            inputRange={[0, 0.5]}
            outputRange={[60, 0]}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <HeroIllustration className="w-full" />
          </ContainerAnimated>
        </div>
      </ContainerSticky>
    </ContainerScroll>
  )
}
