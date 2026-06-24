import { Link } from "react-router-dom"
import { Logo } from "./logo"
import { Globe, Mail, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden bg-navy-800 px-5 py-16 text-cream md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="[&_span:first-child]:text-cream [&_span:last-child]:text-amber-300">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Helping Grade 9 learners and their families move into senior
              school with clarity, not guesswork.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-amber-300">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li><Link to="/how-it-works" className="hover:text-cream">How it works</Link></li>
              <li><Link to="/schools" className="hover:text-cream">For schools</Link></li>
              <li><Link to="/about" className="hover:text-cream">About us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-amber-300">
              For you
            </h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li><Link to="/start" className="hover:text-cream">Start your profile</Link></li>
              <li><Link to="/how-it-works" className="hover:text-cream">For parents</Link></li>
              <li><Link to="/schools" className="hover:text-cream">For teachers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-amber-300">
              Reach us
            </h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li className="flex items-center gap-2">
                <Globe size={16} className="text-amber-300" />
                futurefitlearningsolutions.com
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-300" />
                hello@futurefitlearningsolutions.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-300" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-6 text-xs text-cream/60 md:flex-row">
          <p>© 2026 Future Fit Learning Solutions. Empowering competence, inspiring growth.</p>
          <p>Built for CBC Senior School transition, Kenya.</p>
        </div>
      </div>
    </footer>
  )
}
