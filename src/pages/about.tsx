import { motion } from "framer-motion"
import { Target, Users, ShieldCheck, Sparkles } from "lucide-react"
import { AnimatedHeadline } from "@/components/blocks/animated-headline"

const VALUES = [
  {
    icon: Target,
    title: "Clarity over confusion",
    body: "Complex curriculum information, turned into recommendations a 14-year-old can actually act on.",
  },
  {
    icon: Users,
    title: "Built for everyone in the room",
    body: "Learners, parents, teachers, and counselors all get a view that speaks their language.",
  },
  {
    icon: ShieldCheck,
    title: "Human review, always",
    body: "AI explains and suggests. People — parents, teachers — make the final call.",
  },
  {
    icon: Sparkles,
    title: "Grounded, not generic",
    body: "Every recommendation is tied to approved CBC pathway and subject rules, versioned and auditable.",
  },
]

export function AboutPage() {
  return (
    <div className="px-5 pb-24 pt-24 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
          Our why
        </span>
        <AnimatedHeadline
          text="Empowering competence, inspiring growth."
          as="h1"
          highlightWords={["competence,", "growth."]}
          className="mt-4 justify-center font-display text-3xl font-semibold text-navy-800 sm:text-4xl md:text-5xl"
        />
        <p className="mt-6 text-lg leading-relaxed text-navy-700/75">
          Future Fit exists because the move from Grade 9 to senior school
          shouldn't depend on who you happen to know, or how confident your
          parents feel reading a curriculum brochure. We built a guided,
          AI-assisted companion so every learner in Kenya gets the same
          quality of guidance — clear, kind, and grounded in real curriculum
          rules.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
        {VALUES.map((v, i) => {
          const Icon = v.icon
          return (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-navy-100 bg-white p-7 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-800">
                {v.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-navy-700/75">
                {v.body}
              </p>
            </motion.div>
          )
        })}
      </div>

      <div className="mx-auto mt-20 max-w-3xl rounded-3xl bg-navy-50 p-10 text-center">
        <p className="font-display text-xl font-semibold text-navy-800">
          "Don't just choose a senior school. First, understand yourself."
        </p>
        <p className="mt-3 text-sm text-navy-700/60">— The idea behind everything we build</p>
      </div>
    </div>
  )
}
