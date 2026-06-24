import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"
import { JourneyProgressList, progressPercent } from "@/components/dashboard/journey-progress"
import { Button } from "@/components/ui/button"

export function ParentDashboardOverview() {
  const { account } = useAuth()

  if (!account) return null

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold text-navy-800 sm:text-3xl">
          Welcome back, {account.name.split(" ")[0]}
        </h1>
        <p className="text-navy-700/70">
          Here's how each of your learners is progressing through Future Fit.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {account.learners.map((learner, i) => {
          const pct = progressPercent(learner)
          return (
            <motion.div
              key={learner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-3xl border border-navy-100 bg-white p-6 shadow-soft sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-700 font-display text-lg font-bold text-cream">
                    {learner.firstName[0]}
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-navy-800">
                      {learner.firstName}
                    </h2>
                    <p className="text-sm text-navy-700/60">
                      {learner.grade} · {learner.schoolCurrent}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-forest-700">{pct}%</p>
                  <p className="text-xs text-navy-700/50">complete</p>
                </div>
              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-navy-50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-forest-500 to-amber-500"
                />
              </div>

              {learner.recommendedPathway && (
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700">
                  <Sparkles size={16} />
                  Recommended pathway: {learner.recommendedPathway}
                </div>
              )}

              <div className="mt-5">
                <JourneyProgressList learner={learner} />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/parent/reports">
                  <Button size="sm" variant="outline">
                    View report <ArrowRight size={15} />
                  </Button>
                </Link>
                <Link to="/schools">
                  <Button size="sm" variant="ghost">
                    <GraduationCap size={15} /> Browse schools
                  </Button>
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-navy-200 p-6 text-center text-sm text-navy-700/60">
        Want to add another learner?{" "}
        <Link to="/start" className="font-semibold text-forest-700 hover:underline">
          Start a new profile
        </Link>
      </div>
    </div>
  )
}
