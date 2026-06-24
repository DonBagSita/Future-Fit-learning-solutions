"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedHeadlineProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3"
  highlightWords?: string[]
  highlightClassName?: string
  delay?: number
}

/** Splits text into words and reveals them on scroll into view, blur+rise. */
export function AnimatedHeadline({
  text,
  className,
  as = "h2",
  highlightWords = [],
  highlightClassName = "text-amber-500",
  delay = 0,
}: AnimatedHeadlineProps) {
  const words = text.split(" ")
  const Tag = as

  return (
    <Tag className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => {
        const isHighlighted = highlightWords.some((h) =>
          word.toLowerCase().includes(h.toLowerCase())
        )
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.045,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={cn("mr-[0.28em] inline-block", isHighlighted && highlightClassName)}
          >
            {word}
          </motion.span>
        )
      })}
    </Tag>
  )
}
