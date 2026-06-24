import type { LucideIcon } from "lucide-react"
import { UserRound, Search, BookOpen, Landmark } from "lucide-react"

export interface JourneyStep {
  id: string
  number: string
  title: string
  learnerTitle: string
  description: string
  parentDescription: string
  icon: LucideIcon
  color: "forest" | "violet" | "navy" | "amber"
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "know-yourself",
    number: "01",
    title: "Know Yourself",
    learnerTitle: "Know Yourself",
    description:
      "Answer simple questions about what you enjoy, what you're good at, and what you imagine for your future. No right or wrong answers.",
    parentDescription:
      "Your child completes a guided self-assessment covering strengths, interests, and academic performance — in plain language, at their own pace.",
    icon: UserRound,
    color: "forest",
  },
  {
    id: "discover-careers",
    number: "02",
    title: "Discover Careers",
    learnerTitle: "Discover Careers",
    description:
      "See real careers that match who you are, explained in everyday words — not just job titles you've never heard of.",
    parentDescription:
      "Future Fit translates your child's profile into career families they can relate to, grounded in the CBC pathway structure.",
    icon: Search,
    color: "violet",
  },
  {
    id: "choose-subjects",
    number: "03",
    title: "Choose Subjects",
    learnerTitle: "Choose Subjects",
    description:
      "Get a clear pathway and subject combination recommendation, with a simple reason for every suggestion.",
    parentDescription:
      "Get pathway and subject recommendations aligned to official CBC rules, with plain explanations you can review together.",
    icon: BookOpen,
    color: "navy",
  },
  {
    id: "find-schools",
    number: "04",
    title: "Find Schools",
    learnerTitle: "Find Schools",
    description:
      "Find senior schools near you that actually offer your pathway and subjects — and compare them side by side.",
    parentDescription:
      "Filter verified senior schools by pathway, subjects, location, and type, then compare shortlisted options as a family.",
    icon: Landmark,
    color: "amber",
  },
]

export const COLOR_MAP = {
  forest: {
    bg: "bg-forest-700",
    bgSoft: "bg-forest-50",
    text: "text-forest-700",
    border: "border-forest-300",
    ring: "ring-forest-300",
  },
  violet: {
    bg: "bg-violet-600",
    bgSoft: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-300",
    ring: "ring-violet-300",
  },
  navy: {
    bg: "bg-navy-700",
    bgSoft: "bg-navy-50",
    text: "text-navy-700",
    border: "border-navy-200",
    ring: "ring-navy-200",
  },
  amber: {
    bg: "bg-amber-500",
    bgSoft: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-300",
    ring: "ring-amber-300",
  },
} as const
