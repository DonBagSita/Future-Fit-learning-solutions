import * as React from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Bell, Globe, User } from "lucide-react"

export function ParentSettingsPage() {
  const { account } = useAuth()
  const [language, setLanguage] = React.useState("English")
  const [notifications, setNotifications] = React.useState(true)

  if (!account) return null

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-navy-800 sm:text-3xl">
        Account settings
      </h1>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-800">
            <User size={18} className="text-forest-700" /> Profile
          </h2>
          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-navy-700">Full name</label>
              <input
                defaultValue={account.name}
                className="w-full rounded-xl border border-navy-100 bg-cream-100 px-4 py-2.5 text-navy-800 outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-navy-700">Email</label>
              <input
                defaultValue={account.email}
                className="w-full rounded-xl border border-navy-100 bg-cream-100 px-4 py-2.5 text-navy-800 outline-none focus:border-forest-500"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-800">
            <Globe size={18} className="text-violet-600" /> Language
          </h2>
          <p className="mt-1 text-sm text-navy-700/60">
            Choose the language for guidance and reports.
          </p>
          <div className="mt-4 flex gap-3">
            {["English", "Kiswahili"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  language === lang
                    ? "bg-navy-700 text-cream"
                    : "bg-navy-50 text-navy-700 hover:bg-navy-100"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-800">
            <Bell size={18} className="text-amber-600" /> Notifications
          </h2>
          <label className="mt-4 flex items-center justify-between">
            <span className="text-sm text-navy-700">
              Notify me when a learner completes a step
            </span>
            <button
              onClick={() => setNotifications((n) => !n)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                notifications ? "bg-forest-600" : "bg-navy-200"
              }`}
              aria-pressed={notifications}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </label>
        </section>

        <Button>Save changes</Button>
      </div>
    </div>
  )
}
