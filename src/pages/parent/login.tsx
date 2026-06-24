import * as React from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/logo"
import { useAuth } from "@/lib/auth/auth-context"

export function ParentLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.ok) {
      navigate("/parent/dashboard")
    } else {
      setError(result.error ?? "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="grain flex min-h-screen items-center justify-center bg-gradient-to-b from-navy-50 to-cream px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-navy-100 bg-white p-8 shadow-soft sm:p-10"
      >
        <Link to="/" className="inline-block">
          <Logo />
        </Link>

        <h1 className="mt-7 font-display text-2xl font-semibold text-navy-800">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-navy-700/70">
          Sign in to follow your child's transition progress.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-700">
              Email address
            </label>
            <div className="relative">
              <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-navy-100 bg-cream-100 py-3 pl-10 pr-4 text-navy-800 outline-none transition-colors focus:border-forest-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-navy-700">
              Password
            </label>
            <div className="relative">
              <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-navy-100 bg-cream-100 py-3 pl-10 pr-4 text-navy-800 outline-none transition-colors focus:border-forest-500"
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
            {!loading && <ArrowRight size={18} />}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-navy-700/60">
          New to Future Fit?{" "}
          <Link to="/start" className="font-semibold text-forest-700 hover:underline">
            Create your child's profile
          </Link>
        </p>

        <div className="mt-7 flex items-center justify-center gap-2 border-t border-navy-100 pt-5 text-xs text-navy-700/50">
          <ShieldCheck size={14} />
          Any email and password will sign you into the design preview.
        </div>
      </motion.div>
    </div>
  )
}
