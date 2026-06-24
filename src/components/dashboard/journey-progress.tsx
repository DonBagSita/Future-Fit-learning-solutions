import { CheckCircle2, Circle, Clock } from "lucide-react"
import { JOURNEY_STEPS, COLOR_MAP, type JourneyStep } from "@/lib/journey-data"
import type { LinkedLearner } from "@/lib/auth/auth-context"
import { cn } from "@/lib/utils"

const STEP_KEY_MAP: Record<string, keyof LinkedLearner["progress"]> = {
  "know-yourself": "knowYourself",
  "discover-careers": "discoverCareers",
  "choose-subjects": "chooseSubjects",
  "find-schools": "findSchools",
}

export function progressPercent(learner: LinkedLearner) {
  const values = Object.values(learner.progress)
  const done = values.filter((v) => v === "done").length
  const inProgress = values.filter((v) => v === "in-progress").length
  return Math.round(((done + inProgress * 0.5) / values.length) * 100)
}

export function JourneyProgressList({ learner }: { learner: LinkedLearner }) {
  return (
    <ol className="space-y-3">
      {JOURNEY_STEPS.map((step: JourneyStep) => {
        const status = learner.progress[STEP_KEY_MAP[step.id]]
        const colors = COLOR_MAP[step.color]
        return (
          <li
            key={step.id}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
              status === "done" && "border-forest-100 bg-forest-50 text-forest-800",
              status === "in-progress" && "border-amber-100 bg-amber-50 text-amber-800",
              status === "not-started" && "border-navy-100 bg-white text-navy-700/50"
            )}
          >
            {status === "done" && <CheckCircle2 size={18} className="shrink-0 text-forest-600" />}
            {status === "in-progress" && <Clock size={18} className="shrink-0 text-amber-600" />}
            {status === "not-started" && <Circle size={18} className="shrink-0 text-navy-300" />}
            <span className="flex-1">{step.title}</span>
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", colors.bgSoft, colors.text)}>
              {status === "done" ? "Done" : status === "in-progress" ? "In progress" : "Not started"}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
