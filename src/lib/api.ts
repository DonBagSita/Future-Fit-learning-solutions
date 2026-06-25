import { buildSystemPrompt } from "./system-prompt"
import type { AssessmentStep, ChatMessage, LearnerProfile } from "./types"

/** The parsed JSON response from Claude */
export interface AIResponse {
  message: string
  quickReplies?: string[] | null
  extraction?: Record<string, unknown> | null
  stepComplete?: boolean
  recommendedNextStep?: string | null
}

/**
 * The API endpoint URL. In development this can point to a local server;
 * in production it should point to a Vercel/Cloudflare serverless function.
 *
 * Set via VITE_AI_API_URL environment variable, or falls back to "/api/chat".
 */
const API_URL =
  import.meta.env.VITE_AI_API_URL || "/api/chat"

/**
 * Sends a conversation turn to the Claude API via the backend proxy.
 *
 * The backend proxy is responsible for:
 * - Attaching the API key (never exposed to frontend)
 * - Forwarding to the Anthropic API
 * - Returning the response
 */
export async function sendMessage(
  userMessage: string,
  conversationHistory: ChatMessage[],
  step: AssessmentStep,
  learnerName: string,
  profile: Partial<LearnerProfile>
): Promise<AIResponse> {
  const systemPrompt = buildSystemPrompt(step, learnerName, profile)

  // Build the messages array for the API call
  const messages = [
    // Include conversation history
    ...conversationHistory.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content:
        msg.role === "assistant"
          ? // Strip the structured JSON wrapper from assistant messages
            // so Claude sees natural text in history, not raw JSON
            msg.content
          : msg.content,
    })),
    // Add the new user message
    { role: "user" as const, content: userMessage },
  ]

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system: systemPrompt,
      messages,
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error")
    throw new Error(
      `AI service error (${response.status}): ${errorText}`
    )
  }

  const data = await response.json()

  // The backend proxy returns the Anthropic API response shape.
  // Extract the text content and parse the JSON response.
  let textContent = ""

  if (data.content) {
    // Standard Anthropic API response
    for (const block of data.content) {
      if (block.type === "text") {
        textContent += block.text
      }
    }
  } else if (data.message) {
    // Already parsed by the proxy
    return data as AIResponse
  } else if (typeof data === "string") {
    textContent = data
  }

  return parseAIResponse(textContent)
}

/**
 * Parses Claude's JSON response, handling common formatting issues
 * (markdown code fences, trailing text, etc.)
 */
function parseAIResponse(raw: string): AIResponse {
  // Strip markdown code fences if present
  let cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim()

  // Find the JSON object boundaries
  const firstBrace = cleaned.indexOf("{")
  const lastBrace = cleaned.lastIndexOf("}")

  if (firstBrace === -1 || lastBrace === -1) {
    // Claude didn't return JSON — treat the whole thing as a plain message
    return {
      message: raw.trim(),
      quickReplies: null,
      extraction: null,
      stepComplete: false,
      recommendedNextStep: null,
    }
  }

  cleaned = cleaned.slice(firstBrace, lastBrace + 1)

  try {
    const parsed = JSON.parse(cleaned)
    return {
      message:
        parsed.message || parsed.text || raw.trim(),
      quickReplies: parsed.quickReplies || null,
      extraction: parsed.extraction || null,
      stepComplete: parsed.stepComplete || false,
      recommendedNextStep: parsed.recommendedNextStep || null,
    }
  } catch {
    // JSON parse failed — return as plain message
    return {
      message: raw.trim(),
      quickReplies: null,
      extraction: null,
      stepComplete: false,
      recommendedNextStep: null,
    }
  }
}
