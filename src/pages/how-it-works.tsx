import { motion } from "framer-motion"
import { JOURNEY_STEPS, COLOR_MAP } from "@/lib/journey-data"
import { AnimatedHeadline } from "@/components/blocks/animated-headline"
import { ToneFade } from "@/components/blocks/tone-fade"
import { useTone, useToneCopy } from "@/lib/tone-context"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const STEP_DETAILS: Record<string, { learner: string[]; parent: string[] }> = {
  "know-yourself": {
    learner: [
      "A short, friendly conversation — not a timed exam",
      "Questions about what you enjoy, not just your grades",
      "Takes under 10 minutes, save and continue anytime",
    ],
    parent: [
      "Structured self-assessment covering strengths, interests, academics",
      "Designed for low technical literacy — plain language throughout",
      "Completion typically under 10 minutes per learner",
    ],
  },
  "discover-careers": {
    learner: [
      "See careers explained in words you actually use",
      "Explore options you didn't know existed yet",
      "No pressure to pick — just to explore",
    ],
    parent: [
      "Career families mapped to your child's actual profile",
      "Framed around CBC pathway structure, not vague labels",
      "Designed to widen options, not narrow them prematurely",
    ],
  },
  "choose-subjects": {
    learner: [
      "One pathway recommendation, explained simply",
      "Subject suggestions that connect to your goals",
      "A clear warning if a combination doesn't quite fit",
    ],
    parent: [
      "Pathway and subject combinations aligned to CBC rules",
      "Every recommendation includes the reasoning behind it",
      "Flags misaligned combinations before they become a problem",
    ],
  },
  "find-schools": {
    learner: [
      "Search schools near you that offer your subjects",
      "Compare a few favorites side by side",
      "Share your shortlist with a parent or teacher",
    ],
    parent: [
      "Filter verified schools by pathway, subjects, location, type",
      "Side-by-side comparison for shortlisted schools",
      "Export a transition report as a shareable PDF",
    ],
  },
}

export function HowItWorksPage() {
  const { tone } = useTone()
  const intro = useToneCopy({
    learner: {
      eyebrow: "How Future Fit works",
      heading: "Four steps. Zero guesswork.",
      sub: "Here's exactly what happens when you start — nothing hidden, nothing skipped.",
    },
    parent: {
      eyebrow: "How Future Fit works",
      heading: "A transparent process, from first question to final shortlist.",
      sub: "Each stage is grounded in CBC curriculum rules, with reasoning visible to you at every step.",
    },
  })

  return (
    <div className="pb-24">
      <section className="px-5 pt-24 pb-16 md:px-8 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            {intro.eyebrow}
          </span>
          <AnimatedHeadline
            text={intro.heading}
            as="h1"
            highlightWords={tone === "learner" ? ["Zero", "guesswork."] : ["transparent"]}
            className="mt-4 justify-center font-display text-3xl font-semibold text-navy-800 sm:text-4xl md:text-5xl"
          />
          <ToneFade>
            <p className="mt-6 text-lg text-navy-700/75">{intro.sub}</p>
          </ToneFade>
        </div>
      </section>

      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {JOURNEY_STEPS.map((step, i) => {
            const colors = COLOR_MAP[step.color]
            const Icon = step.icon
            const details = STEP_DETAILS[step.id][tone]
            const isEven = i % 2 === 0

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4, boxShadow: "0 14px 40px -10px rgba(8,15,103,0.18)" }}
                className={cn(
                  "grid items-center gap-8 rounded-3xl border border-navy-100 bg-white p-8 shadow-soft md:grid-cols-[auto_1fr] md:p-10",
                  !isEven && "md:grid-cols-[1fr_auto]"
                )}
              >
                <div
                  className={cn(
                    "flex flex-col items-start gap-4 md:items-center",
                    !isEven && "md:order-2"
                  )}
                >
                  <motion.div
                    className={cn("flex h-16 w-16 items-center justify-center rounded-2xl", colors.bg)}
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={28} className="text-white" />
                  </motion.div>
                  <span className="font-display text-5xl font-bold text-navy-100 md:text-center">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold text-navy-800 sm:text-3xl">
                    {step.title}
                  </h2>
                  <ToneFade>
                    <p className="mt-3 text-navy-700/75">
                      {tone === "learner" ? step.description : step.parentDescription}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {details.map((d, di) => (
                        <li key={di} className="flex items-start gap-2.5 text-sm text-navy-700/85">
                          <CheckCircle2 size={18} className={cn("mt-0.5 shrink-0", colors.text)} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </ToneFade>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="mt-20 px-5 md:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl bg-forest-50 p-10 text-center">
          <h3 className="font-display text-2xl font-semibold text-forest-900">
            Ready to find where you fit?
          </h3>
          <Link to="/start">
            <Button size="lg">
              Start now <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
