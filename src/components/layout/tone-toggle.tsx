import { motion } from "framer-motion"
import { useTone } from "@/lib/tone-context"
import { cn } from "@/lib/utils"

export function ToneToggle({ className }: { className?: string }) {
  const { tone, setTone } = useTone()

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full bg-navy-50 p-1 text-sm font-semibold",
        className
      )}
      role="group"
      aria-label="Switch site voice"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-navy-700 shadow-soft"
        style={{ left: tone === "learner" ? 4 : "calc(50% + 0px)" }}
      />
      <button
        onClick={() => setTone("learner")}
        className={cn(
          "relative z-10 flex-1 rounded-full px-4 py-1.5 transition-colors",
          tone === "learner" ? "text-cream" : "text-navy-700"
        )}
        aria-pressed={tone === "learner"}
      >
        I'm a learner
      </button>
      <button
        onClick={() => setTone("parent")}
        className={cn(
          "relative z-10 flex-1 rounded-full px-4 py-1.5 transition-colors",
          tone === "parent" ? "text-cream" : "text-navy-700"
        )}
        aria-pressed={tone === "parent"}
      >
        I'm a parent
      </button>
    </div>
  )
}
