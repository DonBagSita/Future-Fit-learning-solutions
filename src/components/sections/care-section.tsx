import { motion } from "framer-motion"
import { Heart, ShieldCheck, MessageCircleHeart } from "lucide-react"
import { ToneFade } from "@/components/blocks/tone-fade"
import { useToneCopy } from "@/lib/tone-context"
import { AnimatedHeadline } from "@/components/blocks/animated-headline"

const CARE_POINTS = [
  {
    icon: Heart,
    learnerTitle: "There's no wrong answer",
    parentTitle: "No pass or fail",
    learnerBody: "This isn't a test. It's a conversation about who you are and what you want.",
    parentBody: "The assessment surfaces fit, not failure — every learner finishes with options, not a verdict.",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: MessageCircleHeart,
    learnerTitle: "We explain, we don't just decide",
    parentTitle: "Every recommendation comes with a reason",
    learnerBody: "Every suggestion comes with a simple 'why' — so you understand yourself a little better too.",
    parentBody: "You and your child can see exactly why a pathway or subject was suggested, in plain language.",
    color: "text-forest-700 bg-forest-50",
  },
  {
    icon: ShieldCheck,
    learnerTitle: "Your answers stay private",
    parentTitle: "Your child's data is protected",
    learnerBody: "What you share with Future Fit is yours. We only use it to help you, never to judge you.",
    parentBody: "Learner data is handled with strict privacy controls and role-based access for schools and admins.",
    color: "text-navy-700 bg-navy-50",
  },
]

export function CareSection() {
  return (
    <section className="relative overflow-hidden bg-navy-800 px-5 py-24 text-cream md:px-8 md:py-32">
      {/* drifting ambient gradient blobs — alive, not static */}
      <motion.div
        className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute left-1/3 top-1/3 h-48 w-48 rounded-full bg-forest-500/10 blur-3xl"
        animate={{ x: [0, 50, -20, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">
            How it feels to use Future Fit
          </span>
          <AnimatedHeadline
            text="Built to feel like someone is rooting for you."
            as="h2"
            highlightWords={["rooting"]}
            highlightClassName="text-amber-300"
            className="mt-4 justify-center font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl"
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CARE_POINTS.map((point, i) => (
            <CarePoint key={i} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CarePoint({
  point,
  index,
}: {
  point: (typeof CARE_POINTS)[number]
  index: number
}) {
  const Icon = point.icon
  const copy = useToneCopy({
    learner: { title: point.learnerTitle, body: point.learnerBody },
    parent: { title: point.parentTitle, body: point.parentBody },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -5, borderColor: "rgba(250,248,243,0.2)" }}
      className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-7 backdrop-blur-sm transition-colors"
    >
      <motion.div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${point.color}`}
        whileHover={{ rotate: 12, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
      >
        <Icon size={22} />
      </motion.div>
      <ToneFade>
        <h3 className="mt-5 font-display text-lg font-semibold">{copy.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/70">{copy.body}</p>
      </ToneFade>
    </motion.div>
  )
}
