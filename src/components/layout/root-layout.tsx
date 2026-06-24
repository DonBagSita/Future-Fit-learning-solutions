import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { JourneyRail } from "./journey-rail"

const PATH_TO_STEP: Record<string, string> = {
  "/": "know-yourself",
  "/how-it-works": "discover-careers",
  "/schools": "find-schools",
  "/start": "know-yourself",
}

export function RootLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const activeStepId = PATH_TO_STEP[location.pathname]

  return (
    <div className="relative min-h-screen bg-cream font-body">
      <JourneyRail activeStepId={activeStepId} />
      <SiteHeader />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  )
}
