import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { JOURNEY_STEPS, COLOR_MAP } from "@/lib/journey-data"
import { cn } from "@/lib/utils"

interface JourneyRailProps {
  activeStepId?: string
  className?: string
}

/**
 * Returns the active step based on scroll position.
 * Sections must have id attributes matching JOURNEY_STEPS[i].id
 */
function useScrollActiveStep(externalActiveStepId?: string) {
  const [activeStepId, setActiveStepId] = useState(
    externalActiveStepId ?? JOURNEY_STEPS[0].id
  )

  useEffect(() => {
    // If a page hard-codes an active step, respect it and skip scroll tracking
    if (externalActiveStepId) {
      setActiveStepId(externalActiveStepId)
      return
    }

    const stepIds = JOURNEY_STEPS.map((s) => s.id)

    function onScroll() {
      const scrollMid = window.scrollY + window.innerHeight / 2

      // Walk sections from bottom to top; first one whose top is above
      // the midpoint wins
      let current = stepIds[0]
      for (const id of stepIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollMid) {
          current = id
        }
      }
      setActiveStepId(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // run once on mount
    return () => window.removeEventListener("scroll", onScroll)
  }, [externalActiveStepId])

  return activeStepId
}

export function JourneyRail({ activeStepId: externalActiveStepId, className }: JourneyRailProps) {
  const activeStepId = useScrollActiveStep(externalActiveStepId)

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
                "group relative flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-300",
                isActive
                  ? cn(colors.bg, "h-4 w-4 border-transparent")
                  : "border-navy-200 bg-cream"
              )}
              animate={isActive ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 1.8, repeat: isActive ? Infinity : 0 }}
            >
              <span
                className={cn(
                  "pointer-events-none absolute left-6 whitespace-nowrap rounded-md bg-navy-800 px-2.5 py-1 text-xs font-semibold text-cream shadow-soft transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              >
                {step.title}
              </span>
            </motion.div>

            {/* Connector line — fills with color as steps are passed */}
            {i < JOURNEY_STEPS.length - 1 && (
              <div className="relative h-10 w-px bg-navy-200">
                <motion.div
                  className={cn("absolute inset-x-0 top-0 w-px", colors.bg)}
                  initial={{ height: "0%" }}
                  animate={{
                    height: JOURNEY_STEPS.findIndex((s) => s.id === activeStepId) > i
                      ? "100%"
                      : "0%",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

/** Mobile/tablet equivalent — slim horizontal dots, no labels, lives in header */
export function JourneyRailCompact({ activeStepId }: { activeStepId?: string }) {
  const active = useScrollActiveStep(activeStepId)
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {JOURNEY_STEPS.map((step) => {
        const isActive = step.id === active
        const colors = COLOR_MAP[step.color]
        return (
          <span
            key={step.id}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              isActive ? cn(colors.bg, "w-4") : "bg-navy-200"
            )}
          />
        )
      })}
    </div>
  )
}
