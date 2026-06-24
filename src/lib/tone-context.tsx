import * as React from "react"

export type Tone = "learner" | "parent"

interface ToneContextValue {
  tone: Tone
  setTone: (t: Tone) => void
  toggle: () => void
}

const ToneContext = React.createContext<ToneContextValue | undefined>(
  undefined
)

export function ToneProvider({ children }: { children: React.ReactNode }) {
  const [tone, setTone] = React.useState<Tone>("learner")

  const toggle = React.useCallback(() => {
    setTone((t) => (t === "learner" ? "parent" : "learner"))
  }, [])

  return (
    <ToneContext.Provider value={{ tone, setTone, toggle }}>
      {children}
    </ToneContext.Provider>
  )
}

export function useTone() {
  const ctx = React.useContext(ToneContext)
  if (!ctx) throw new Error("useTone must be used within ToneProvider")
  return ctx
}

/**
 * Helper for picking copy by audience. Keeps tone-switch logic out of
 * every component — pass an object with both voices, get the right one.
 */
export function useToneCopy<T>(copy: { learner: T; parent: T }): T {
  const { tone } = useTone()
  return copy[tone]
}
