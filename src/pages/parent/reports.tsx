import { motion } from "framer-motion"
import { Download, Share2, FileText } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { progressPercent } from "@/components/dashboard/journey-progress"

export function ParentReportsPage() {
  const { account } = useAuth()
  if (!account) return null

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800 sm:text-3xl">
        Transition reports
      </h1>
      <p className="mt-1 text-navy-700/70">
        A shareable summary of each learner's profile, pathway, and shortlisted schools.
      </p>

      <div className="mt-8 space-y-4">
        {account.learners.map((learner, i) => {
          const pct = progressPercent(learner)
          const ready = pct === 100
          return (
            <motion.div
              key={learner.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-800">
                    {learner.firstName}'s transition report
                  </h3>
                  <p className="text-sm text-navy-700/60">
                    {ready
                      ? "Ready to download — all 4 steps complete"
                      : `${pct}% complete — finish all steps to unlock the full report`}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="sm" variant="outline" disabled={!ready}>
                  <Share2 size={15} /> Share
                </Button>
                <Button size="sm" disabled={!ready}>
                  <Download size={15} /> Download PDF
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-amber-50 p-5 text-sm text-amber-800">
        Report generation connects to the Claude-powered summary engine in the
        next build phase. This preview shows the intended layout and states.
      </div>
    </div>
  )
}
