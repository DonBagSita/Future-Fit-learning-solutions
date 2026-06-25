import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { JOURNEY_STEPS, COLOR_MAP } from "@/lib/journey-data"
import { ASSESSMENT_STEPS, type AssessmentStep } from "@/lib/ai/types"
import { cn } from "@/lib/utils"

interface StepProgressProps {
  currentStep: AssessmentStep
  className?: string
}

export function StepProgress({ currentStep, className }: StepProgressProps) {
  const currentIndex = ASSESSMENT_STEPS.indexOf(currentStep)

  return (
    <div className={cn("flex items-center justify-center gap-0", className)}>
      {JOURNEY_STEPS.map((step, i) => {
        const colors = COLOR_MAP[step.color]
        const isCompleted = i < currentIndex
        const isCurrent = i === currentIndex
        const isPending = i > currentIndex

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all",
                  isCompleted && `${colors.bg} text-white`,
                  isCurrent && `${colors.bg} text-white ring-4 ${colors.ring} ring-opacity-30`,
                  isPending && "bg-navy-100 text-navy-400"
                )}
                animate={isCurrent ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
              >
                {isCompleted ? <Check size={16} /> : step.number}
              </motion.div>
              <span
                className={cn(
                  "mt-1.5 whitespace-nowrap text-[10px] font-semibold",
                  isCurrent ? colors.text : "text-navy-400"
                )}
              >
                {step.title}
              </span>
            </div>
            {i < JOURNEY_STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1.5 h-[2px] w-6 rounded-full sm:mx-3 sm:w-10",
                  i < currentIndex ? "bg-navy-700" : "bg-navy-100"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
