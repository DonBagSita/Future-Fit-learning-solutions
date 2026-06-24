import * as React from "react"

export interface LinkedLearner {
  id: string
  firstName: string
  grade: string
  schoolCurrent: string
  progress: {
    knowYourself: "done" | "in-progress" | "not-started"
    discoverCareers: "done" | "in-progress" | "not-started"
    chooseSubjects: "done" | "in-progress" | "not-started"
    findSchools: "done" | "in-progress" | "not-started"
  }
  recommendedPathway?: string
  shortlistedSchools?: string[]
}

interface ParentAccount {
  name: string
  email: string
  learners: LinkedLearner[]
}

interface AuthContextValue {
  isAuthenticated: boolean
  account: ParentAccount | null
  login: (email: string, _password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

// Mock account used for the design-phase preview. Real auth + data
// fetched from the backend plugs in here once available.
const MOCK_ACCOUNT: ParentAccount = {
  name: "Mrs. Wanjiru Kamau",
  email: "wanjiru.kamau@example.com",
  learners: [
    {
      id: "learner-1",
      firstName: "Amani",
      grade: "Grade 9",
      schoolCurrent: "Riverside Junior School",
      progress: {
        knowYourself: "done",
        discoverCareers: "done",
        chooseSubjects: "in-progress",
        findSchools: "not-started",
      },
      recommendedPathway: "STEM Pathway",
    },
    {
      id: "learner-2",
      firstName: "Zawadi",
      grade: "Grade 9",
      schoolCurrent: "Riverside Junior School",
      progress: {
        knowYourself: "done",
        discoverCareers: "in-progress",
        chooseSubjects: "not-started",
        findSchools: "not-started",
      },
    },
  ],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = React.useState<ParentAccount | null>(null)

  const login = React.useCallback(async (email: string, _password: string) => {
    // Simulated network delay — replace with real auth call later.
    await new Promise((r) => setTimeout(r, 600))
    if (!email.includes("@")) {
      return { ok: false, error: "Enter a valid email address." }
    }
    setAccount({ ...MOCK_ACCOUNT, email })
    return { ok: true }
  }, [])

  const logout = React.useCallback(() => setAccount(null), [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!account, account, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
