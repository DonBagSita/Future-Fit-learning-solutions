/** A single message in the guided conversation */
export interface ChatMessage {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: number
  /** Quick-reply options the AI can attach to a message */
  quickReplies?: string[]
  /** When the AI is done with a step, it emits a structured extraction */
  extraction?: Partial<LearnerProfile>
}

/** The learner's profile, built up progressively through the conversation */
export interface LearnerProfile {
  firstName: string
  /** Free-text interests the learner described */
  interests: string[]
  /** Strengths the learner or AI identified */
  strengths: string[]
  /** Academic subjects they enjoy or perform well in */
  academicStrengths: string[]
  /** Academic subjects they find difficult */
  academicWeaknesses: string[]
  /** Career ideas they mentioned, even vague ones */
  careerIdeas: string[]
  /** What motivates them — helping people, building things, creativity, etc */
  motivations: string[]
  /** Their own words about what they want from senior school */
  aspirations: string
  /** County / location for school matching */
  county: string
  /** Current school name */
  currentSchool: string
}

/** A CBC Senior School pathway recommendation */
export interface PathwayRecommendation {
  pathwayId: string
  pathwayName: string
  confidence: "strong" | "moderate" | "exploratory"
  reasoning: string
  /** Why this pathway connects to what they said */
  connectionToProfile: string[]
}

/** A subject combination recommendation */
export interface SubjectRecommendation {
  compulsory: string[]
  electives: string[]
  reasoning: string
  warnings: string[]
}

/** Full recommendation output after the assessment */
export interface AssessmentResult {
  profile: LearnerProfile
  profileSummary: string
  pathways: PathwayRecommendation[]
  subjects: SubjectRecommendation
  schoolCriteria: {
    pathways: string[]
    county: string
    schoolTypes: string[]
  }
}

/** The 4 steps of the assessment journey */
export type AssessmentStep =
  | "know-yourself"
  | "discover-careers"
  | "choose-subjects"
  | "find-schools"

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  "know-yourself",
  "discover-careers",
  "choose-subjects",
  "find-schools",
]

export const STEP_LABELS: Record<AssessmentStep, string> = {
  "know-yourself": "Know Yourself",
  "discover-careers": "Discover Careers",
  "choose-subjects": "Choose Subjects",
  "find-schools": "Find Schools",
}

/** Overall assessment state */
export interface AssessmentState {
  learnerName: string
  currentStep: AssessmentStep
  messages: ChatMessage[]
  profile: Partial<LearnerProfile>
  result: AssessmentResult | null
  isLoading: boolean
  error: string | null
}
