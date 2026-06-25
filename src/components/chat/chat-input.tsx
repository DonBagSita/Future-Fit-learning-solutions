import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (text: string) => void
  quickReplies?: string[]
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  quickReplies,
  disabled,
  placeholder = "Type your answer...",
}: ChatInputProps) {
  const [text, setText] = React.useState("")
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickReply = (reply: string) => {
    if (disabled) return
    onSend(reply)
  }

  // Auto-resize textarea
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }, [text])

  return (
    <div className="border-t border-navy-100 bg-cream-100 px-4 pb-4 pt-3">
      {/* quick replies */}
      <AnimatePresence>
        {quickReplies && quickReplies.length > 0 && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 flex flex-wrap gap-2"
          >
            {quickReplies.map((reply) => (
              <motion.button
                key={reply}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQuickReply(reply)}
                className="rounded-full border-2 border-forest-200 bg-white px-4 py-2 text-sm font-semibold text-forest-700 transition-colors hover:border-forest-500 hover:bg-forest-50"
              >
                {reply}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* text input */}
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none rounded-xl border-2 border-navy-100 bg-white px-4 py-3 pr-12 text-navy-800 outline-none transition-colors",
              "focus:border-forest-500 disabled:opacity-50",
              "placeholder:text-navy-400"
            )}
          />
        </div>
        <motion.button
          whileHover={text.trim() && !disabled ? { scale: 1.08 } : {}}
          whileTap={text.trim() && !disabled ? { scale: 0.92 } : {}}
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
            text.trim() && !disabled
              ? "bg-forest-700 text-white shadow-soft"
              : "bg-navy-100 text-navy-400"
          )}
          aria-label="Send message"
        >
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  )
}
