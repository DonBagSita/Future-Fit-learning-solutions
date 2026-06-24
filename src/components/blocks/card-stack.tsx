"use client"

import * as React from "react"
import type { MotionValue, HTMLMotionProps } from "framer-motion"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardsContainerContextValue {
  scrollYProgress: MotionValue<number>
}

const CardsContainerContext = React.createContext<
  CardsContainerContextValue | undefined
>(undefined)

function useCardsContainerContext() {
  const ctx = React.useContext(CardsContainerContext)
  if (!ctx) {
    throw new Error("CardTransformed must be used within CardsContainer")
  }
  return ctx
}

export const CardsContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <CardsContainerContext.Provider value={{ scrollYProgress }}>
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CardsContainerContext.Provider>
  )
})
CardsContainer.displayName = "CardsContainer"

interface CardTransformedProps extends HTMLMotionProps<"div"> {
  index: number
  arrayLength: number
}

export const CardTransformed = React.forwardRef<
  HTMLDivElement,
  CardTransformedProps
>(({ className, index, arrayLength, children, style, ...props }, ref) => {
  const { scrollYProgress } = useCardsContainerContext()
  const start = index / arrayLength
  const end = start + 1 / arrayLength

  const rotate = useTransform(
    scrollYProgress,
    [start, end],
    [index % 2 === 0 ? -6 : 6, 0]
  )
  const y = useTransform(scrollYProgress, [start, end], [120, 0])
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const scale = useTransform(scrollYProgress, [start, end], [0.9, 1])

  return (
    <motion.div
      ref={ref}
      style={{ rotate, y, opacity, scale, ...style }}
      className={cn(
        "absolute inset-0 flex flex-col justify-between rounded-2xl border border-navy-100 bg-white p-6 shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
})
CardTransformed.displayName = "CardTransformed"
