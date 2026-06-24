import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Lock, Clock3, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToneFade } from "@/components/blocks/tone-fade"
import { useToneCopy } from "@/lib/tone-context"

const PROMISE_ITEMS = [
  "No trick questions — just honest ones",
  "Save progress anytime, come back later",
  "Get a clear result you can share",
]

export function StartPage() {
  const [name, setName] = React.useState("")
  const [focused, setFocused] = React.useState(false)

  const copy = useToneCopy({
    learner: {
      heading: "Let's get to know you.",
      sub: "First, what should we call you? No pressure — this is just between us.",
      placeholder: "Your first name",
      cta: "Begin my profile",
    },
    parent: {
      heading: "Let's set up your child's profile.",
      sub: "Enter your child's first name to begin their guided self-assessment.",
      placeholder: "Learner's first name",
      cta: "Begin assessment",
    },
  })

  return (
    <div className="flex min-h-[calc(100svh-72px)] items-center justify-center px-5 py-20 md:px-8">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-amber-500/8 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-20 bottom-1/3 h-80 w-80 rounded-full bg-forest-500/8 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
        {/* welcome badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800"
        >
          <Sparkles size={16} />
          Free for the first 200 learners
        </motion.div>

        <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-soft sm:p-12">
          <div className="flex items-center gap-2 text-sm font-semibold text-forest-700">
            <Clock3 size={16} /> Under 10 minutes
          </div>

          <ToneFade>
            <h1 className="mt-4 font-display text-3xl font-semibold text-navy-800 sm:text-4xl">
              {copy.heading}
            </h1>
            <p className="mt-3 text-navy-700/75">{copy.sub}</p>
          </ToneFade>

          <div className="mt-8 space-y-5">
            <div>
              <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-navy-700">
                First name
              </label>
              <motion.div
                animate={focused ? { scale: 1.01 } : { scale: 1 }}
                className="relative"
              >
                <input
                  id="firstName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={copy.placeholder}
                  autoComplete="given-name"
                  className="w-full rounded-xl border-2 border-navy-100 bg-cream-100 px-4 py-3.5 text-navy-800 outline-none transition-colors focus:border-forest-500 focus:bg-white"
                />
                {name.trim().length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-500"
                  >
                    <CheckCircle2 size={20} />
                  </motion.div>
                )}
              </motion.div>
            </div>

            <motion.div
              whileHover={name.trim() ? { scale: 1.02 } : {}}
              whileTap={name.trim() ? { scale: 0.98 } : {}}
            >
              <Button
                size="lg"
                className="w-full"
                disabled={!name.trim()}
              >
                {copy.cta} <ArrowRight size={18} />
              </Button>
            </motion.div>
          </div>

          {/* promises */}
          <ul className="mt-8 space-y-2.5">
            {PROMISE_ITEMS.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2.5 text-sm text-navy-700/65"
              >
                <CheckCircle2 size={16} className="shrink-0 text-forest-500" />
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-navy-700/50">
            <Lock size={13} /> Your answers are private and only used to guide you.
          </div>
        </div>

        {/* preview notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 rounded-2xl bg-amber-50 p-4 text-center text-sm text-amber-800"
        >
          The full guided conversation, powered by an LLM, connects here in the
          next build phase. For now you're previewing the look and feel of Future Fit.
        </motion.div>
      </motion.div>
    </div>
  )
}
