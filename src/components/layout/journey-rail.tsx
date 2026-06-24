import { motion } from "framer-motion"
import { JOURNEY_STEPS, COLOR_MAP } from "@/lib/journey-data"
import { cn } from "@/lib/utils"

interface JourneyRailProps {
  activeStepId?: string
  className?: string
}

/**
 * The site's signature structural device. The PRD's core journey
 * (Know Yourself -> Discover Careers -> Choose Subjects -> Find Schools)
 * is the spine of the product, not just hero copy — so it's rendered as a
 * persistent rail that travels with the learner across pages, with the
 * relevant step lighting up depending on context.
 */
export function JourneyRail({ activeStepId, className }: JourneyRailProps) {
  return (
    <nav
      aria-label="Future Fit journey"
      className={cn(
        "hidden xl:flex fixed left-6 top-1/2 z-40 -translate-y-1/2 flex-col items-center gap-0",
        className
      )}
    >
      {JOURNEY_STEPS.map((step, i) => {
        const isActive = step.id === activeStepId
        const colors = COLOR_MAP[step.color]
        return (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              className={cn(
                "group relative flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all",
                isActive
                  ? cn(colors.bg, "h-4 w-4 border-transparent")
                  : "border-navy-200 bg-cream"
              )}
              animate={isActive ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 1.8, repeat: isActive ? Infinity : 0 }}
            >
              <span
                className={cn(
                  "pointer-events-none absolute left-6 whitespace-nowrap rounded-md bg-navy-800 px-2.5 py-1 text-xs font-semibold text-cream opacity-0 shadow-soft transition-opacity",
                  "group-hover:opacity-100",
                  isActive && "opacity-100"
                )}
              >
                {step.title}
              </span>
            </motion.div>
            {i < JOURNEY_STEPS.length - 1 && (
              <div className="h-10 w-px bg-navy-200" />
            )}
          </div>
        )
      })}
    </nav>
  )
}

/** Mobile/tablet equivalent — slim horizontal dots, no labels, lives in header */
export function JourneyRailCompact({ activeStepId }: { activeStepId?: string }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {JOURNEY_STEPS.map((step) => {
        const isActive = step.id === activeStepId
        const colors = COLOR_MAP[step.color]
        return (
          <span
            key={step.id}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all",
              isActive ? cn(colors.bg, "w-4") : "bg-navy-200"
            )}
          />
        )
      })}
    </div>
  )
}
