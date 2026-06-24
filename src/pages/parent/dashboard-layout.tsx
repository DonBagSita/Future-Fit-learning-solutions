import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { useAuth } from "@/lib/auth/auth-context"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Overview", to: "/parent/dashboard", icon: LayoutDashboard },
  { label: "Transition reports", to: "/parent/reports", icon: FileText },
  { label: "Account settings", to: "/parent/settings", icon: Settings },
]

export function ParentDashboardLayout() {
  const { account, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <div className="flex min-h-screen bg-cream-100">
      <aside className="hidden w-64 flex-col border-r border-navy-100 bg-white px-5 py-6 md:flex">
        <Link to="/" className="mb-8 px-2">
          <Logo />
        </Link>

        <nav className="flex flex-1 flex-col gap-1" aria-label="Parent dashboard">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "bg-forest-50 text-forest-700"
                    : "text-navy-700/70 hover:bg-navy-50 hover:text-navy-800"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-navy-100 pt-4">
          <p className="truncate px-3 text-sm font-semibold text-navy-800">
            {account?.name}
          </p>
          <p className="truncate px-3 text-xs text-navy-700/50">{account?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-700/70 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      {/* mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-navy-100 bg-white px-5 py-3 md:hidden">
        <Logo />
        <button
          onClick={handleLogout}
          className="rounded-lg p-2 text-navy-700/70"
          aria-label="Sign out"
        >
          <LogOut size={20} />
        </button>
      </div>

      <main className="flex-1 px-5 py-8 pt-20 md:px-10 md:py-10 md:pt-10">
        <Outlet />
      </main>
    </div>
  )
}
