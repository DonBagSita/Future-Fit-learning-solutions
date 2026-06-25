import * as React from "react"
import type {
  AssessmentState,
  AssessmentStep,
  ChatMessage,
  LearnerProfile,
  AssessmentResult,
} from "./types"
import { sendMessage } from "./api"

interface AssessmentContextValue extends AssessmentState {
  startAssessment: (name: string) => void
  sendUserMessage: (text: string) => Promise<void>
  goToStep: (step: AssessmentStep) => void
  reset: () => void
  result: AssessmentResult | null
}

const AssessmentContext = React.createContext<
  AssessmentContextValue | undefined
>(undefined)

const INITIAL_STATE: AssessmentState = {
  learnerName: "",
  currentStep: "know-yourself",
  messages: [],
  profile: {},
  result: null,
  isLoading: false,
  error: null,
}

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

export function AssessmentProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = React.useState<AssessmentState>(INITIAL_STATE)

  const addMessage = React.useCallback(
    (msg: Omit<ChatMessage, "id" | "timestamp">) => {
      const fullMsg: ChatMessage = {
        ...msg,
        id: makeId(),
        timestamp: Date.now(),
      }
      setState((s) => ({ ...s, messages: [...s.messages, fullMsg] }))
      return fullMsg
    },
    []
  )

  const startAssessment = React.useCallback(
    async (name: string) => {
      setState(() => ({
        ...INITIAL_STATE,
        learnerName: name,
        profile: { firstName: name },
        isLoading: true,
      }))

      try {
        const response = await sendMessage(
          `My name is ${name}. I'm a Grade 9 learner in Kenya and I'm trying to figure out my path to Grade 10.`,
          [],
          "know-yourself",
          name,
          { firstName: name }
        )

        setState((s) => ({
          ...s,
          isLoading: false,
          messages: [
            {
              id: makeId(),
              role: "assistant",
              content: response.message,
              timestamp: Date.now(),
              quickReplies: response.quickReplies || undefined,
            },
          ],
        }))
      } catch (err) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : "Something went wrong starting the conversation.",
        }))
      }
    },
    []
  )

  const sendUserMessage = React.useCallback(
    async (text: string) => {
      // Add user message immediately
      addMessage({ role: "user", content: text })

      setState((s) => ({ ...s, isLoading: true, error: null }))

      try {
        const currentMessages = [
          ...state.messages,
          {
            id: makeId(),
            role: "user" as const,
            content: text,
            timestamp: Date.now(),
          },
        ]

        const response = await sendMessage(
          text,
          state.messages, // history without the new message (it's added separately)
          state.currentStep,
          state.learnerName,
          state.profile
        )

        // Merge any profile extraction
        let updatedProfile = { ...state.profile }
        if (response.extraction) {
          updatedProfile = deepMergeProfile(
            updatedProfile,
            response.extraction as Partial<LearnerProfile>
          )
        }

        // Add assistant message
        const assistantMsg: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content: response.message,
          timestamp: Date.now(),
          quickReplies: response.quickReplies || undefined,
          extraction: response.extraction
            ? (response.extraction as Partial<LearnerProfile>)
            : undefined,
        }

        // Check if step is complete
        let nextStep = state.currentStep
        let result = state.result
        if (
          response.stepComplete &&
          response.recommendedNextStep
        ) {
          nextStep = response.recommendedNextStep as AssessmentStep
        }

        // If we've finished all steps, build the result
        if (
          response.stepComplete &&
          state.currentStep === "find-schools"
        ) {
          result = buildResult(updatedProfile)
        }

        setState((s) => ({
          ...s,
          isLoading: false,
          messages: [...currentMessages, assistantMsg],
          profile: updatedProfile,
          currentStep: nextStep,
          result,
        }))
      } catch (err) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : "Failed to get a response. Please try again.",
        }))
      }
    },
    [state.messages, state.currentStep, state.learnerName, state.profile, state.result, addMessage]
  )

  const goToStep = React.useCallback((step: AssessmentStep) => {
    setState((s) => ({ ...s, currentStep: step }))
  }, [])

  const reset = React.useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  return (
    <AssessmentContext.Provider
      value={{
        ...state,
        startAssessment,
        sendUserMessage,
        goToStep,
        reset,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const ctx = React.useContext(AssessmentContext)
  if (!ctx)
    throw new Error("useAssessment must be used within AssessmentProvider")
  return ctx
}

// ── Helpers ──────────────────────────────────────────────────────────

function deepMergeProfile(
  existing: Partial<LearnerProfile>,
  incoming: Partial<LearnerProfile>
): Partial<LearnerProfile> {
  const merged = { ...existing }

  for (const [key, value] of Object.entries(incoming)) {
    if (value === null || value === undefined) continue
    const k = key as keyof LearnerProfile
    if (Array.isArray(value) && Array.isArray(merged[k])) {
      // Merge arrays, deduplicate
      ;(merged as Record<string, unknown>)[k] = [
        ...new Set([...(merged[k] as string[]), ...value]),
      ]
    } else {
      ;(merged as Record<string, unknown>)[k] = value
    }
  }

  return merged
}

function buildResult(
  profile: Partial<LearnerProfile>
): AssessmentResult {
  return {
    profile: profile as LearnerProfile,
    profileSummary: `Profile for ${profile.firstName || "Learner"}`,
    pathways: [],
    subjects: {
      compulsory: [],
      electives: [],
      reasoning: "",
      warnings: [],
    },
    schoolCriteria: {
      pathways: [],
      county: profile.county || "",
      schoolTypes: [],
    },
  }
}
