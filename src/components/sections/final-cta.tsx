import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToneFade } from "@/components/blocks/tone-fade"
import { useToneCopy } from "@/lib/tone-context"

export function FinalCta() {
  const copy = useToneCopy({
    learner: {
      heading: "Your senior school decision starts with knowing yourself.",
      cta: "Start your profile — it's free",
    },
    parent: {
      heading: "Give your child a clearer, calmer path to Grade 10.",
      cta: "Explore Future Fit for your family",
    },
  })

  return (
    <section className="px-5 pb-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grain relative overflow-hidden rounded-3xl bg-navy-800 px-6 py-14 text-center text-cream sm:px-12 sm:py-20"
        >
          {/* drifting accent blobs */}
          <motion.div
            className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl"
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-forest-500/20 blur-3xl"
            animate={{ x: [0, -20, 15, 0], y: [0, 10, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <motion.div
            initial={{ rotate: -8, scale: 0.9 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-navy-900"
          >
            <Megaphone size={26} />
          </motion.div>

          <ToneFade>
            <p className="font-display text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl">
              {copy.heading}
            </p>
          </ToneFade>

          <motion.p
            className="mx-auto mt-4 max-w-md font-semibold text-amber-300"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            Free for the first 200 Grade 9 learners
          </motion.p>

          <ToneFade>
            <Link to="/start" className="mt-8 inline-block">
              <Button size="lg" variant="secondary">
                {copy.cta}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </ToneFade>
        </motion.div>
      </div>
    </section>
  )
}
