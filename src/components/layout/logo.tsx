import { cn } from "@/lib/utils"

export function Logo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 56"
        className="h-9 w-auto shrink-0"
        aria-hidden="true"
      >
        {/* bulb glass — left hemisphere navy/violet, right hemisphere amber */}
        <path
          d="M24 4C13.5 4 6 12 6 22c0 7 4 12.5 8.5 16v6c0 1.5 1 2.5 2.5 2.5h14c1.5 0 2.5-1 2.5-2.5v-6C38 34.5 42 29 42 22 42 12 34.5 4 24 4Z"
          fill="#0B1387"
        />
        <path
          d="M24 4C34.5 4 42 12 42 22c0 7-4 12.5-8.5 16v6c0 1.5-1 2.5-2.5 2.5h-7V4.05C24 4.03 24 4.02 24 4Z"
          fill="#F2A900"
        />
        {/* brain folds, simplified, in violet over the navy half */}
        <path
          d="M11 18c1.5-3 4-4.5 6-4 1.5.4 2 2 1 3-1.2 1.2-1 2.5.3 3.2 1.6.9 1.4 3-.2 3.7-2 .9-1.8 3.3.2 4 1.5.5 1.7 2.3.3 3.2"
          stroke="#5B2A86"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* base of bulb / fitting */}
        <rect x="17.5" y="50" width="13" height="2.5" rx="1.25" fill="#0F4D2E" />
        <rect x="18.5" y="53.5" width="11" height="2.5" rx="1.25" fill="#0F4D2E" />
      </svg>
      {withWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-bold tracking-tight text-navy-700">
            Future Fit
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-forest-700">
            Learning Solutions
          </span>
        </div>
      )}
    </div>
  )
}
