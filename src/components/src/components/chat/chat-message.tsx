import { motion } from "framer-motion"
import type { ChatMessage } from "@/lib/ai/types"
import { cn } from "@/lib/utils"

interface ChatMessageBubbleProps {
  message: ChatMessage
  isLatest: boolean
}

export function ChatMessageBubble({ message, isLatest }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant"

  return (
    <motion.div
      initial={isLatest ? { opacity: 0, y: 12, scale: 0.97 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex w-full", isAssistant ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          "relative max-w-[85%] rounded-2xl px-5 py-3.5 text-[0.95rem] leading-relaxed sm:max-w-[75%]",
          isAssistant
            ? "rounded-tl-md bg-white text-navy-800 shadow-soft border border-navy-50"
            : "rounded-tr-md bg-navy-700 text-cream"
        )}
      >
        {isAssistant && (
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-forest-500" />
            <span className="text-xs font-semibold text-forest-700">
              Future Fit
            </span>
          </div>
        )}

        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  )
}
