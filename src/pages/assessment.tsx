import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Lock, Clock3, Sparkles, CheckCircle2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatMessageBubble } from "@/components/chat/chat-message"
import { ChatInput } from "@/components/chat/chat-input"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { StepProgress } from "@/components/chat/step-progress"
import { useAssessment } from "@/lib/ai/assessment-store"
import { STEP_LABELS } from "@/lib/ai/types"

export function AssessmentPage() {
  const {
    learnerName,
    result,
    startAssessment,
    reset,
  } = useAssessment()

  // If no name yet, show the name entry screen
  if (!learnerName) {
    return <NameEntry onStart={startAssessment} />
  }

  // If assessment is complete, show results
  if (result) {
    return <AssessmentComplete result={result} onReset={reset} />
  }

  // Otherwise, show the conversation
  return <ConversationView />
}

// ── Name entry ──────────────────────────────────────────────────────
function NameEntry({ onStart }: { onStart: (name: string) => void }) {
  const [name, setName] = React.useState("")
  const [focused, setFocused] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) onStart(name.trim())
  }

  return (
    <div className="flex min-h-[calc(100svh-72px)] items-center justify-center px-5 py-20 md:px-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-amber-500/[0.08] blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-20 bottom-1/3 h-80 w-80 rounded-full bg-forest-500/[0.08] blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800"
        >
          <Sparkles size={16} />
          Free for the first 200 learners
        </motion.div>

        <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-soft sm:p-12">
          <div className="flex items-center gap-2 text-sm font-semibold text-forest-700">
            <Clock3 size={16} /> Under 10 minutes
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold text-navy-800 sm:text-4xl">
            Let's get to know you.
          </h1>
          <p className="mt-3 text-navy-700/75">
            First, what should we call you? No pressure — this is just between us.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-navy-700">
                First name
              </label>
              <motion.div animate={focused ? { scale: 1.01 } : { scale: 1 }} className="relative">
                <input
                  id="firstName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Your first name"
                  autoComplete="given-name"
                  autoFocus
                  className="w-full rounded-xl border-2 border-navy-100 bg-cream-100 px-4 py-3.5 text-navy-800 outline-none transition-colors focus:border-forest-500 focus:bg-white"
                />
                {name.trim().length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-500"
                  >
                    <CheckCircle2 size={20} />
                  </motion.div>
                )}
              </motion.div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={!name.trim()}>
              Begin my profile <ArrowRight size={18} />
            </Button>
          </form>

          <ul className="mt-8 space-y-2.5">
            {[
              "No trick questions — just honest ones",
              "A real conversation, powered by AI",
              "Get a clear pathway recommendation",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2.5 text-sm text-navy-700/65"
              >
                <CheckCircle2 size={16} className="shrink-0 text-forest-500" />
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-navy-700/50">
            <Lock size={13} /> Your answers are private and only used to guide you.
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Conversation view ───────────────────────────────────────────────
function ConversationView() {
  const {
    learnerName,
    messages,
    currentStep,
    isLoading,
    error,
    sendUserMessage,
    reset,
  } = useAssessment()

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const lastQuickReplies = messages
    .filter((m) => m.role === "assistant" && m.quickReplies?.length)
    .at(-1)?.quickReplies

  // Scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length, isLoading])

  return (
    <div className="flex min-h-[calc(100svh-72px)] flex-col">
      {/* header bar */}
      <div className="sticky top-[72px] z-30 border-b border-navy-100 bg-cream/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-sm font-semibold text-navy-800">
              {STEP_LABELS[currentStep]}
            </h2>
            <p className="text-xs text-navy-700/60">
              with {learnerName}
            </p>
          </div>
          <StepProgress currentStep={currentStep} className="hidden sm:flex" />
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-navy-700/60 transition-colors hover:bg-navy-50 hover:text-navy-700"
          >
            <RotateCcw size={13} /> Start over
          </button>
        </div>
        {/* mobile step progress */}
        <StepProgress currentStep={currentStep} className="mt-2 flex sm:hidden" />
      </div>

      {/* messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <ChatMessageBubble
                key={msg.id}
                message={msg}
                isLatest={i === messages.length - 1}
              />
            ))}
          </AnimatePresence>

          {isLoading && <TypingIndicator />}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
              <button
                onClick={() => sendUserMessage("continue")}
                className="ml-2 font-semibold underline"
              >
                Try again
              </button>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* input */}
      <div className="sticky bottom-0 mx-auto w-full max-w-2xl">
        <ChatInput
          onSend={sendUserMessage}
          quickReplies={isLoading ? undefined : lastQuickReplies}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}

// ── Assessment complete ─────────────────────────────────────────────
function AssessmentComplete({
  result,
  onReset,
}: {
  result: NonNullable<ReturnType<typeof useAssessment>["result"]>
  onReset: () => void
}) {
  return (
    <div className="flex min-h-[calc(100svh-72px)] items-center justify-center px-5 py-20 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-3xl border border-navy-100 bg-white p-8 text-center shadow-soft sm:p-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-700"
        >
          <CheckCircle2 size={32} />
        </motion.div>

        <h1 className="font-display text-3xl font-semibold text-navy-800">
          You did it, {result.profile.firstName}!
        </h1>
        <p className="mt-4 text-navy-700/75">
          Your Future Fit profile is complete. Share it with your parent or
          guardian so you can review the pathway and school recommendations together.
        </p>

        <div className="mt-8 space-y-4">
          <Button size="lg" className="w-full" onClick={onReset}>
            Start a new profile
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
