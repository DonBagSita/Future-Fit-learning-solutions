import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Microscope, Palette, Users2, Wrench, ChevronRight } from "lucide-react"
import { AnimatedHeadline } from "@/components/blocks/animated-headline"
import { cn } from "@/lib/utils"

const PATHWAYS = [
  {
    id: "stem",
    name: "STEM",
    fullName: "Science, Technology, Engineering & Mathematics",
    icon: Microscope,
    color: "bg-forest-700",
    colorLight: "bg-forest-50",
    colorText: "text-forest-700",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
    careers: ["Software Engineer", "Doctor", "Architect", "Environmental Scientist", "Data Analyst"],
    description:
      "For learners drawn to how things work — from code to living systems to the built environment.",
  },
  {
    id: "arts",
    name: "Arts & Sports",
    fullName: "Arts & Sports Science",
    icon: Palette,
    color: "bg-violet-600",
    colorLight: "bg-violet-50",
    colorText: "text-violet-600",
    subjects: ["Fine Art", "Music", "Theatre Arts", "Physical Education", "Design"],
    careers: ["Graphic Designer", "Athlete", "Filmmaker", "Sports Coach", "Fashion Designer"],
    description:
      "For learners who express ideas through creativity, performance, movement, or design.",
  },
  {
    id: "social",
    name: "Social Sciences",
    fullName: "Social Sciences",
    icon: Users2,
    color: "bg-navy-700",
    colorLight: "bg-navy-50",
    colorText: "text-navy-700",
    subjects: ["History", "Geography", "Government", "CRE/IRE", "Business Studies"],
    careers: ["Lawyer", "Journalist", "Diplomat", "Teacher", "Social Worker"],
    description:
      "For learners curious about people, societies, law, and how communities function.",
  },
  {
    id: "technical",
    name: "Technical",
    fullName: "Technical & Engineering",
    icon: Wrench,
    color: "bg-amber-500",
    colorLight: "bg-amber-50",
    colorText: "text-amber-700",
    subjects: ["Power Mechanics", "Metalwork", "Building Construction", "Electricity", "Drawing & Design"],
    careers: ["Electrician", "Mechanical Technician", "Civil Engineer", "Welder", "Automotive Engineer"],
    description:
      "For learners who learn by building, fixing, and making things work with their hands.",
  },
]

export function PathwayExplorer() {
  const [activeId, setActiveId] = React.useState("stem")
  const active = PATHWAYS.find((p) => p.id === activeId)!
  const ActiveIcon = active.icon

  return (
    <section className="bg-cream-100 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
            Explore before you commit
          </span>
          <AnimatedHeadline
            text="Which pathway sounds like you?"
            as="h2"
            highlightWords={["you?"]}
            className="mt-4 justify-center font-display text-3xl font-semibold text-navy-800 sm:text-4xl"
          />
          <p className="mt-5 text-lg text-navy-700/75">
            Tap a pathway below to see what it covers, what subjects are involved,
            and where it could lead. No commitment — just curiosity.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* pathway tabs — vertical on desktop, horizontal scroll on mobile */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {PATHWAYS.map((p) => {
              const Icon = p.icon
              const isActive = p.id === activeId
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-xl px-5 py-4 text-left font-semibold transition-all",
                    isActive
                      ? "bg-white text-navy-800 shadow-soft"
                      : "bg-transparent text-navy-700/60 hover:text-navy-700"
                  )}
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", isActive ? p.color : "bg-navy-50")}>
                    <Icon size={20} className={isActive ? "text-white" : "text-navy-400"} />
                  </div>
                  <span className="whitespace-nowrap">{p.name}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto hidden lg:block" />}
                </motion.button>
              )
            })}
          </div>

          {/* detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="rounded-2xl border border-navy-100 bg-white p-8 shadow-soft md:p-10"
            >
              <div className="flex items-center gap-4">
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", active.color)}>
                  <ActiveIcon size={26} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-navy-800">{active.fullName}</h3>
                </div>
              </div>
              <p className="mt-5 text-navy-700/75">{active.description}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy-700/50">
                    Subjects you'd study
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {active.subjects.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className={cn("flex items-center gap-2 text-sm font-medium", active.colorText)}
                      >
                        <span className={cn("h-2 w-2 rounded-full", active.color)} />
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy-700/50">
                    Where it can lead
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {active.careers.map((c, i) => (
                      <motion.li
                        key={c}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 + 0.15 }}
                        className="text-sm text-navy-700/75"
                      >
                        {c}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
