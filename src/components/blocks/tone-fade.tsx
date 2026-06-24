import { motion, AnimatePresence } from "framer-motion"
import { useTone } from "@/lib/tone-context"

interface ToneFadeProps {
  children: React.ReactNode
  className?: string
}

/**
 * Wraps content that changes when the learner/parent toggle fires.
 * Cross-fades instead of snapping — the whole point is that switching
 * tone should feel like turning a page, not hitting a reload button.
 */
export function ToneFade({ children, className }: ToneFadeProps) {
  const { tone } = useTone()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tone}
        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
