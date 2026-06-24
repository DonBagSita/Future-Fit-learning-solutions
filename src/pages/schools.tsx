import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Filter, GraduationCap, Star, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { AnimatedHeadline } from "@/components/blocks/animated-headline"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface School {
  name: string
  county: string
  type: "Boarding" | "Day" | "Mixed"
  pathways: string[]
  fit: number
}

const SCHOOLS: School[] = [
  { name: "Alliance High School", county: "Kiambu", type: "Boarding", pathways: ["STEM"], fit: 96 },
  { name: "Kenya High School", county: "Nairobi", type: "Boarding", pathways: ["STEM", "Social Sciences"], fit: 91 },
  { name: "Maranda High School", county: "Siaya", type: "Boarding", pathways: ["STEM"], fit: 88 },
  { name: "Precious Blood Riruta", county: "Nairobi", type: "Day", pathways: ["Arts & Sports Science"], fit: 84 },
  { name: "Moi Girls Eldoret", county: "Uasin Gishu", type: "Boarding", pathways: ["Social Sciences", "STEM"], fit: 79 },
  { name: "Mombasa Academy", county: "Mombasa", type: "Mixed", pathways: ["STEM", "Arts & Sports Science"], fit: 87 },
  { name: "Starehe Boys Centre", county: "Nairobi", type: "Boarding", pathways: ["STEM", "Social Sciences"], fit: 93 },
  { name: "Loreto Limuru", county: "Kiambu", type: "Boarding", pathways: ["Social Sciences", "Arts & Sports Science"], fit: 82 },
  { name: "Nairobi School", county: "Nairobi", type: "Boarding", pathways: ["STEM"], fit: 90 },
]

const PATHWAYS = ["All", "STEM", "Social Sciences", "Arts & Sports Science"]

export function SchoolsPage() {
  const [pathway, setPathway] = React.useState("All")

  const filtered = SCHOOLS.filter(
    (s) => pathway === "All" || s.pathways.includes(pathway)
  ).sort((a, b) => b.fit - a.fit)

  return (
    <div className="px-5 pb-24 pt-24 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
          Find Schools
        </span>
        <AnimatedHeadline
          text="Schools that actually offer what you need."
          as="h1"
          highlightWords={["actually"]}
          className="mt-4 justify-center font-display text-3xl font-semibold text-navy-800 sm:text-4xl md:text-5xl"
        />
        <p className="mt-6 text-lg text-navy-700/75">
          Filter by pathway, compare fit scores, and shortlist schools — all
          grounded in verified data. Full real-time matching arrives with the
          AI-powered release.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        {/* filter bar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-navy-700/70">
            <Filter size={15} /> Pathway:
          </span>
          {PATHWAYS.map((p) => (
            <motion.button
              key={p}
              onClick={() => setPathway(p)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200",
                pathway === p
                  ? "bg-navy-700 text-cream shadow-soft"
                  : "bg-navy-50 text-navy-700 hover:bg-navy-100"
              )}
              layout
            >
              {p}
            </motion.button>
          ))}
        </div>

        {/* results count */}
        <motion.p
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-sm text-navy-700/50"
        >
          {filtered.length} school{filtered.length !== 1 ? "s" : ""} found
        </motion.p>

        <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((school) => (
              <motion.div
                key={school.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6, boxShadow: "0 14px 40px -10px rgba(8,15,103,0.20)" }}
                className="group flex cursor-default flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <motion.div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white"
                    whileHover={{ rotate: 8 }}
                  >
                    <GraduationCap size={20} />
                  </motion.div>
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                    <Star size={12} fill="currentColor" strokeWidth={0} />
                    {school.fit}% fit
                  </div>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold text-navy-800">
                  {school.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-700/60">
                  <MapPin size={14} /> {school.county} · {school.type}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {school.pathways.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* subtle hover-reveal CTA */}
                <div className="mt-4 flex h-0 items-center overflow-hidden opacity-0 transition-all duration-300 group-hover:h-8 group-hover:opacity-100">
                  <span className="flex items-center gap-1 text-xs font-semibold text-forest-700">
                    View details <ArrowRight size={13} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-navy-700/60"
          >
            No schools match that pathway in this preview — try another filter.
          </motion.p>
        )}

        <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 rounded-2xl bg-forest-50 p-8 text-center">
          <p className="font-display text-lg font-semibold text-forest-900">
            Want personalized school matches?
          </p>
          <p className="text-sm text-forest-700/75">
            Complete your Future Fit profile first — your pathway and subjects
            determine which schools actually fit.
          </p>
          <Link to="/start">
            <Button size="md">Start your profile <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
