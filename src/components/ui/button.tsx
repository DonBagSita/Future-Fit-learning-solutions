import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-forest-700 text-cream hover:bg-forest-600 shadow-soft",
  secondary:
    "bg-amber-500 text-navy-900 hover:bg-amber-600 shadow-glow",
  ghost:
    "bg-transparent text-navy-700 hover:bg-navy-50",
  outline:
    "bg-transparent border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-cream",
}

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-colors",
          "focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"
