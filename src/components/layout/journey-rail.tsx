import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { JOURNEY_STEPS, COLOR_MAP } from "@/lib/journey-data"
import { cn } from "@/lib/utils"

interface JourneyRailProps {
  activeStepId?: string
  className?: string
}

/**
 * If a page passes an explicit activeStepId, use it.
 * Otherwise, track scroll through the #journey section and
 * light up each dot proportionally as the user scrolls through it.
 */
function useScrollActiveStep(externalActiveStepId?: string) {
  const [activeStepId, setActiveStepId] = useState(JOURNEY_STEPS[0].id)

  useEffect(() => {
    if (externalActiveStepId) {
      setActiveStepId(externalActiveStepId)
      return
    }

    function onScroll() {
      const section = document.getElementById("journey")
      if (!section) {
        // No journey section on this page — default to first step
        setActiveStepId(JOURNEY_STEPS[0].id)
        return
      }

      const { top, height } = section.getBoundingClientRect()
      const windowH = window.innerHeight

      // progress: 0 when section top hits bottom of viewport,
      //           1 when section bottom hits top of viewport
      const progress = Math.min(
        1,
        Math.max(0, (windowH - top) / (height + windowH))
      )

      // Map progress to a step index
      const index = Math.min(
        JOURNEY_STEPS.length - 1,
        Math.floor(progress * JOURNEY_STEPS.length)
      )
      setActiveStepId(JOURNEY_STEPS[index].id)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [externalActiveStepId])

  return activeStepId
}

export function JourneyRail({ activeStepId: externalActiveStepId, className }: JourneyRailProps) {
  const activeStepId = useScrollActiveStep(externalActiveStepId)
  const activeIndex = JOURNEY_STEPS.findIndex((s) => s.id === activeStepId)

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
        const isPast = i < activeIndex
        const colors = COLOR_MAP[step.color]

        return (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              className={cn(
                "group relative flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-300",
                isActive
                  ? cn(colors.bg, "h-4 w-4 border-transparent")
                  : isPast
                  ? cn(colors.bg, "border-transparent opacity-60")
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

            {/* Connector line fills downward as steps are passed */}
            {i < JOURNEY_STEPS.length - 1 && (
              <div className="relative h-10 w-px bg-navy-200">
                <motion.div
                  className={cn("absolute inset-x-0 top-0 w-px", colors.bg)}
                  initial={{ height: "0%" }}
                  animate={{ height: isPast || isActive ? "100%" : "0%" }}
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
