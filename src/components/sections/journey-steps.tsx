import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { JOURNEY_STEPS, COLOR_MAP } from "@/lib/journey-data"
import { AnimatedHeadline } from "@/components/blocks/animated-headline"
import { ToneFade } from "@/components/blocks/tone-fade"
import { useTone } from "@/lib/tone-context"
import { cn } from "@/lib/utils"

export function JourneySteps() {
  const { tone } = useTone()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  })
  // Connecting line draws from 0% to 100% width as section scrolls
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={sectionRef} className="relative px-5 py-24 md:px-8 md:py-32" id="journey">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            The Future Fit path
          </span>
          <AnimatedHeadline
            text="One path. Four honest steps."
            as="h2"
            highlightWords={["Four", "honest"]}
            className="mt-4 justify-center font-display text-3xl font-semibold text-navy-800 sm:text-4xl"
          />
          <ToneFade>
            <p className="mt-5 text-lg text-navy-700/75">
              {tone === "learner"
                ? "No shortcuts, no scary forms. Just one step at a time, in an order that actually makes sense."
                : "A structured sequence your child moves through, with reasoning surfaced at every step for you to review."}
            </p>
          </ToneFade>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line that draws itself across on scroll — desktop only */}
          <div className="absolute left-[7%] right-[7%] top-[88px] z-0 hidden h-[3px] overflow-hidden rounded-full bg-navy-50 lg:block">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-forest-500 via-violet-500 via-50% to-amber-500"
              style={{ width: lineWidth }}
            />
          </div>

          {JOURNEY_STEPS.map((step, i) => {
            const colors = COLOR_MAP[step.color]
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
                whileHover={{ y: -6, boxShadow: "0 12px 40px -10px rgba(8,15,103,0.22)" }}
                className="group relative z-10 flex cursor-default flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition-colors"
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl transition-transform",
                      colors.bg
                    )}
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={26} className="text-white" />
                  </motion.div>
                  <span className="font-display text-3xl font-bold text-navy-100 transition-colors group-hover:text-navy-200">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-navy-800">
                  {step.title}
                </h3>
                <ToneFade>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700/75">
                    {tone === "learner" ? step.description : step.parentDescription}
                  </p>
                </ToneFade>

                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy-400 lg:hidden">
                    <span>Next</span>
                    <span className={colors.text}>{JOURNEY_STEPS[i + 1].title}</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
