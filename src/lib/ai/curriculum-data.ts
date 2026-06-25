/**
 * CBC Senior School (Grade 10–12) Pathway and Subject Data
 *
 * Sources: Kenya Ministry of Education CBC framework,
 * KICD Senior School Subject Guidelines, Grade 10 Placement Criteria 2026.
 *
 * This data is the single source of truth the AI uses for all
 * pathway and subject recommendations. It must be kept in sync
 * with official curriculum updates via the admin panel (PRD §10.7).
 */

export interface CBCPathway {
  id: string
  name: string
  fullName: string
  description: string
  suitableFor: string
  compulsorySubjects: string[]
  electiveGroups: ElectiveGroup[]
  careerFamilies: string[]
}

export interface ElectiveGroup {
  name: string
  pickMin: number
  pickMax: number
  subjects: string[]
}

export interface SchoolRecord {
  id: string
  name: string
  county: string
  type: "Boarding" | "Day" | "Mixed"
  gender: "Boys" | "Girls" | "Mixed"
  pathways: string[]
  subjects: string[]
  fitNotes: string
}

// ── CBC Core compulsory subjects (all pathways) ──────────────────────
export const CORE_COMPULSORY = [
  "Mathematics",
  "English",
  "Kiswahili",
  "Community Service Learning",
]

// ── The 4 main CBC Senior School pathways ────────────────────────────
export const CBC_PATHWAYS: CBCPathway[] = [
  {
    id: "stem",
    name: "STEM",
    fullName: "Science, Technology, Engineering & Mathematics",
    description:
      "For learners drawn to scientific inquiry, technology, engineering design, and mathematical reasoning.",
    suitableFor:
      "Learners who enjoy experiments, solving problems, building things, coding, or understanding how natural systems work.",
    compulsorySubjects: [...CORE_COMPULSORY, "Physics", "Biology or Chemistry"],
    electiveGroups: [
      {
        name: "STEM Electives",
        pickMin: 2,
        pickMax: 3,
        subjects: [
          "Chemistry",
          "Biology",
          "Computer Science",
          "Agriculture",
          "Additional Mathematics",
          "Technology & Enterprise",
        ],
      },
    ],
    careerFamilies: [
      "Medicine & Health Sciences",
      "Engineering (all branches)",
      "Software Development & IT",
      "Architecture & Construction",
      "Environmental Science",
      "Data Science & Analytics",
      "Pharmaceutical Sciences",
      "Agricultural Technology",
    ],
  },
  {
    id: "arts-sports",
    name: "Arts & Sports Science",
    fullName: "Arts & Sports Science",
    description:
      "For learners who express ideas through visual arts, music, theatre, movement, or physical performance.",
    suitableFor:
      "Learners who love drawing, painting, music, drama, dance, athletics, or creative storytelling.",
    compulsorySubjects: [...CORE_COMPULSORY],
    electiveGroups: [
      {
        name: "Arts Electives",
        pickMin: 2,
        pickMax: 3,
        subjects: [
          "Fine Art",
          "Music",
          "Theatre Arts",
          "Film & Media Studies",
          "Design",
        ],
      },
      {
        name: "Sports Electives",
        pickMin: 0,
        pickMax: 2,
        subjects: [
          "Physical Education",
          "Sports Science",
          "Health & Nutrition",
        ],
      },
    ],
    careerFamilies: [
      "Graphic Design & Visual Arts",
      "Music Production & Performance",
      "Film, TV & Content Creation",
      "Professional Athletics & Coaching",
      "Fashion Design",
      "Sports Medicine & Physiotherapy",
      "Event Management",
      "Arts Education",
    ],
  },
  {
    id: "social-sciences",
    name: "Social Sciences",
    fullName: "Social Sciences",
    description:
      "For learners interested in people, societies, governance, law, and understanding how communities function.",
    suitableFor:
      "Learners who enjoy reading, debating, learning about history and cultures, or thinking about justice and fairness.",
    compulsorySubjects: [...CORE_COMPULSORY, "History"],
    electiveGroups: [
      {
        name: "Social Science Electives",
        pickMin: 2,
        pickMax: 3,
        subjects: [
          "Geography",
          "Government & Civic Education",
          "CRE (Christian Religious Education)",
          "IRE (Islamic Religious Education)",
          "HRE (Hindu Religious Education)",
          "Business Studies",
          "Sociology",
        ],
      },
    ],
    careerFamilies: [
      "Law & Legal Practice",
      "Journalism & Media",
      "Diplomacy & International Relations",
      "Teaching & Education",
      "Social Work & Community Development",
      "Public Administration",
      "Human Resources",
      "Counseling & Psychology",
    ],
  },
  {
    id: "technical",
    name: "Technical & Engineering",
    fullName: "Technical & Engineering",
    description:
      "For learners who learn by building, fixing, making, and applying practical skills in trades and technical work.",
    suitableFor:
      "Learners who enjoy working with their hands, fixing machines, building structures, or understanding how electrical and mechanical systems operate.",
    compulsorySubjects: [...CORE_COMPULSORY, "Drawing & Design"],
    electiveGroups: [
      {
        name: "Technical Electives",
        pickMin: 2,
        pickMax: 3,
        subjects: [
          "Power Mechanics",
          "Metalwork",
          "Woodwork",
          "Building Construction",
          "Electricity & Electronics",
          "Automotive Engineering",
          "Plumbing & Piping",
        ],
      },
    ],
    careerFamilies: [
      "Electrical Engineering & Installation",
      "Mechanical & Automotive Repair",
      "Civil & Construction Engineering",
      "Welding & Fabrication",
      "HVAC & Plumbing",
      "Telecommunications Technician",
      "Industrial Manufacturing",
      "Renewable Energy Installation",
    ],
  },
]

// ── Kenyan counties for location matching ───────────────────────────
export const KENYAN_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet",
  "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga",
  "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia",
  "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
  "Tharaka-Nithi", "Trans-Nzoia", "Turkana", "Uasin Gishu",
  "Vihiga", "Wajir", "West Pokot",
]

// ── Sample school directory (mock — to be replaced by real admin-managed data) ──
export const SCHOOL_DIRECTORY: SchoolRecord[] = [
  {
    id: "s1", name: "Alliance High School", county: "Kiambu", type: "Boarding",
    gender: "Boys", pathways: ["stem", "social-sciences"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "History", "Geography"],
    fitNotes: "National school, competitive STEM program",
  },
  {
    id: "s2", name: "Kenya High School", county: "Nairobi", type: "Boarding",
    gender: "Girls", pathways: ["stem", "social-sciences"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "CRE"],
    fitNotes: "National school, strong sciences and humanities",
  },
  {
    id: "s3", name: "Starehe Boys Centre", county: "Nairobi", type: "Boarding",
    gender: "Boys", pathways: ["stem", "social-sciences"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "History", "Business Studies"],
    fitNotes: "Scholarship-supported, strong academic track record",
  },
  {
    id: "s4", name: "Precious Blood Riruta", county: "Nairobi", type: "Day",
    gender: "Girls", pathways: ["arts-sports", "social-sciences"],
    subjects: ["Fine Art", "Music", "History", "CRE", "Business Studies", "Geography"],
    fitNotes: "Strong arts and humanities programs",
  },
  {
    id: "s5", name: "Maranda High School", county: "Siaya", type: "Boarding",
    gender: "Boys", pathways: ["stem"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Agriculture"],
    fitNotes: "National school, strong STEM tradition",
  },
  {
    id: "s6", name: "Moi Girls Eldoret", county: "Uasin Gishu", type: "Boarding",
    gender: "Girls", pathways: ["social-sciences", "stem"],
    subjects: ["Mathematics", "Biology", "Chemistry", "History", "Geography", "CRE"],
    fitNotes: "National school, balanced academics",
  },
  {
    id: "s7", name: "Nairobi School", county: "Nairobi", type: "Boarding",
    gender: "Boys", pathways: ["stem", "social-sciences"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "History", "Computer Science"],
    fitNotes: "National school with strong technical facilities",
  },
  {
    id: "s8", name: "Loreto Limuru", county: "Kiambu", type: "Boarding",
    gender: "Girls", pathways: ["social-sciences", "arts-sports"],
    subjects: ["History", "Geography", "CRE", "Fine Art", "Music", "Business Studies"],
    fitNotes: "Strong arts and social sciences programs",
  },
  {
    id: "s9", name: "Kabarak High School", county: "Nakuru", type: "Boarding",
    gender: "Mixed", pathways: ["stem", "social-sciences"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "History", "CRE", "Computer Science"],
    fitNotes: "Well-resourced, strong sciences and faith-based values",
  },
  {
    id: "s10", name: "Mombasa Academy", county: "Mombasa", type: "Mixed",
    gender: "Mixed", pathways: ["stem", "arts-sports"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Computer Science", "Fine Art", "Design"],
    fitNotes: "Mixed school, coastal location, arts and STEM balance",
  },
  {
    id: "s11", name: "Kisumu Boys High School", county: "Kisumu", type: "Boarding",
    gender: "Boys", pathways: ["technical", "stem"],
    subjects: ["Mathematics", "Physics", "Drawing & Design", "Power Mechanics", "Electricity & Electronics"],
    fitNotes: "Strong technical and engineering programs",
  },
  {
    id: "s12", name: "Nakuru Girls High School", county: "Nakuru", type: "Boarding",
    gender: "Girls", pathways: ["social-sciences", "stem"],
    subjects: ["Mathematics", "Biology", "Chemistry", "History", "Geography", "Business Studies"],
    fitNotes: "County school with solid academic foundations",
  },
]

/**
 * Matches schools to a learner's recommended pathways and location.
 * Returns schools sorted by relevance with a fit score.
 */
export function matchSchools(
  pathwayIds: string[],
  county?: string,
  recommendedSubjects?: string[]
): (SchoolRecord & { fitScore: number })[] {
  return SCHOOL_DIRECTORY.map((school) => {
    let score = 0

    // Pathway match (highest weight)
    const pathwayOverlap = school.pathways.filter((p) =>
      pathwayIds.includes(p)
    ).length
    score += pathwayOverlap * 40

    // County match
    if (county && school.county.toLowerCase() === county.toLowerCase()) {
      score += 25
    }

    // Subject overlap
    if (recommendedSubjects) {
      const subjectOverlap = school.subjects.filter((s) =>
        recommendedSubjects.includes(s)
      ).length
      score += subjectOverlap * 5
    }

    return { ...school, fitScore: Math.min(score, 100) }
  })
    .filter((s) => s.fitScore > 0)
    .sort((a, b) => b.fitScore - a.fitScore)
}
