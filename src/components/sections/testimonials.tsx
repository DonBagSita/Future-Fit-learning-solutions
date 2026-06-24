import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { ToneFade } from "@/components/blocks/tone-fade"
import { useToneCopy } from "@/lib/tone-context"

const LEARNER_VOICES = [
  {
    name: "Brian, Grade 9",
    quote:
      "I thought I had to already know what I wanted to be. Future Fit helped me see that liking how things work was already a clue.",
    pathway: "STEM pathway",
  },
  {
    name: "Achieng, Grade 9",
    quote:
      "It asked me about drawing and storytelling, not just my grades. That felt different from anything else I'd tried.",
    pathway: "Arts & Sports Science",
  },
  {
    name: "Kevo, Grade 9",
    quote:
      "I liked that it explained why it suggested a pathway. It didn't just give me an answer and leave.",
    pathway: "Social Sciences",
  },
]

const PARENT_VOICES = [
  {
    name: "Mrs. Wanjiru, parent",
    quote:
      "For the first time I understood what 'pathway' actually meant before sitting with my daughter to discuss it.",
    pathway: "Mother of 2 Grade 9 learners",
  },
  {
    name: "Mr. Otieno, parent",
    quote:
      "We compared three schools side by side instead of relying on rumors from other parents at the gate.",
    pathway: "Parent, Kisumu",
  },
  {
    name: "Mrs. Chebet, parent",
    quote:
      "My son felt like he was being listened to, not assessed. That mattered more to me than I expected.",
    pathway: "Parent, Eldoret",
  },
]

const cardVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 280 : -280,
    opacity: 0,
    scale: 0.92,
    rotateY: dir > 0 ? 12 : -12,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -280 : 280,
    opacity: 0,
    scale: 0.92,
    rotateY: dir > 0 ? -12 : 12,
  }),
}

export function Testimonials() {
  const voices = useToneCopy({ learner: LEARNER_VOICES, parent: PARENT_VOICES })
  const heading = useToneCopy({
    learner: "Other Grade 9s, being honest",
    parent: "What other parents found",
  })

  const [[page, direction], setPage] = React.useState([0, 0])
  const [paused, setPaused] = React.useState(false)
  const idx = ((page % voices.length) + voices.length) % voices.length

  // auto-cycle every 5s unless paused
  React.useEffect(() => {
    if (paused) return
    const t = setInterval(() => setPage(([p]) => [p + 1, 1]), 5000)
    return () => clearInterval(t)
  }, [paused])

  const paginate = (dir: number) => {
    setPage(([p]) => [p + dir, dir])
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  const v = voices[idx]

  return (
    <section className="overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
            In their own words
          </span>
          <ToneFade>
            <h2 className="mt-4 font-display text-3xl font-semibold text-navy-800 sm:text-4xl">
              {heading}
            </h2>
          </ToneFade>
        </div>

        <div
          className="relative mx-auto mt-16 flex h-[320px] max-w-lg items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ perspective: 1200 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${idx}-${voices === LEARNER_VOICES ? "l" : "p"}`}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
              className="absolute flex w-full flex-col justify-between rounded-2xl border border-navy-100 bg-white p-8 shadow-soft"
            >
              <div>
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-navy-800">
                  "{v.quote}"
                </p>
              </div>
              <div className="mt-6 border-t border-navy-100 pt-4">
                <p className="font-semibold text-navy-800">{v.name}</p>
                <p className="text-sm text-navy-700/60">{v.pathway}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* nav arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute -left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-700 shadow-soft transition-transform hover:scale-110 md:-left-14"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-700 shadow-soft transition-transform hover:scale-110 md:-right-14"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* dots indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {voices.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > idx ? 1 : -1])}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === idx ? "w-6 bg-navy-700" : "w-2 bg-navy-200"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-navy-700/50">
          Illustrative testimonials for design preview — replace with real feedback at launch.
        </p>
      </div>
    </section>
  )
}
