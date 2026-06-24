# Future Fit Learning Solutions — Website (Look & Feel Phase)

This is the front-end design build for Future Fit, focused on look, feel, and
interaction — before the Claude AI assessment engine is wired in.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL shown (usually http://localhost:5173).

## Or preview the static build

```bash
npm run build
npm run preview
```

## What's here

- **Home** — scroll-pinned hero, the 4-step Future Fit journey, a "how it
  feels" reassurance section, testimonials, final CTA.
- **How it works** — deep dive into each of the 4 steps with tone-specific detail.
- **Find schools** — interactive filterable school directory (mock data).
- **About** — mission and values.
- **Start** — entry point into the assessment (UI only — this is where the
  Claude-powered conversational engine plugs in next).

## The learner/parent tone switch

Toggle "I'm a learner" / "I'm a parent" in the header. It changes headline
copy, descriptions, and testimonials throughout the site via `ToneProvider`
in `src/lib/tone-context.tsx`. Add new tone-aware copy anywhere using the
`useToneCopy({ learner: ..., parent: ... })` hook.

## The journey rail (signature element)

A persistent vertical rail on desktop (`xl:` and up) tracks which step of the
Know Yourself → Discover Careers → Choose Subjects → Find Schools journey the
current page relates to. See `src/components/layout/journey-rail.tsx` and
`src/lib/journey-data.ts` (single source of truth for the 4 steps).

## Where AI implementation plugs in next

- `src/pages/start.tsx` — replace the name-only form with the actual guided
  conversation once the Claude integration is ready.
- `src/pages/schools.tsx` — currently mock data; swap in real school records.
- `src/lib/journey-data.ts` — step copy can be generated/personalized once
  the AI layer is live.

## Stack

Vite + React + TypeScript + Tailwind CSS + Framer Motion + React Router,
shadcn-style `@/components/ui` structure so future shadcn components drop in
without rework.
