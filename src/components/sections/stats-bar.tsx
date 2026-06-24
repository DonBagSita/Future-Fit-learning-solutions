import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Users, School, Route, FileCheck } from "lucide-react"

const STATS = [
  { icon: Users, value: 200, suffix: "+", label: "Learners already exploring", color: "text-forest-700" },
  { icon: Route, value: 4, suffix: "", label: "CBC pathways covered", color: "text-violet-600" },
  { icon: School, value: 50, suffix: "+", label: "Schools in the directory", color: "text-navy-700" },
  { icon: FileCheck, value: 10, suffix: "min", label: "To complete your profile", color: "text-amber-600" },
]

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <span className="tabular-nums">
      {display}{suffix}
    </span>
  )
}

export function StatsBar() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative z-10 px-5 md:px-8">
      <div
        ref={ref}
        className="mx-auto -mt-14 max-w-5xl rounded-2xl border border-navy-100 bg-white px-6 py-8 shadow-soft md:px-10 md:py-10"
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className={`mb-2 ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <span className={`font-display text-3xl font-bold ${stat.color} md:text-4xl`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                </span>
                <span className="mt-1 text-xs font-medium text-navy-700/60 md:text-sm">
                  {stat.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
