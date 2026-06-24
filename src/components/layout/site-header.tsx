import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"
import { ToneToggle } from "./tone-toggle"
import { Button } from "@/components/ui/button"
import { useTone } from "@/lib/tone-context"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "How it works", to: "/how-it-works" },
  { label: "For schools", to: "/schools" },
  { label: "About", to: "/about" },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const location = useLocation()
  const { tone } = useTone()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-cream/90 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link to="/" aria-label="Future Fit home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm font-semibold text-navy-700/80 transition-colors hover:text-navy-700",
                location.pathname === link.to && "text-forest-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ToneToggle />
          {tone === "parent" && (
            <Link
              to="/parent/login"
              className="text-sm font-semibold text-navy-700/80 hover:text-navy-700"
            >
              Parent login
            </Link>
          )}
          <Link to="/start">
            <Button size="sm">Start now</Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 text-navy-700 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-navy-100 bg-cream lg:hidden"
          >
            <div className="flex flex-col gap-5 px-6 py-6">
              <ToneToggle />
              <nav className="flex flex-col gap-4" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-lg font-semibold text-navy-700"
                  >
                    {link.label}
                  </Link>
                ))}
                {tone === "parent" && (
                  <Link to="/parent/login" className="text-lg font-semibold text-forest-700">
                    Parent login
                  </Link>
                )}
              </nav>
              <Link to="/start">
                <Button className="w-full">Start now</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
