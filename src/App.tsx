import { HashRouter, Routes, Route } from "react-router-dom"
import { ToneProvider } from "@/lib/tone-context"
import { AuthProvider } from "@/lib/auth/auth-context"
import { RequireAuth } from "@/lib/auth/require-auth"
import { RootLayout } from "@/components/layout/root-layout"
import { HomePage } from "@/pages/home"
import { HowItWorksPage } from "@/pages/how-it-works"
import { SchoolsPage } from "@/pages/schools"
import { AboutPage } from "@/pages/about"
import { StartPage } from "@/pages/start"
import { ParentLoginPage } from "@/pages/parent/login"
import { ParentDashboardLayout } from "@/pages/parent/dashboard-layout"
import { ParentDashboardOverview } from "@/pages/parent/dashboard-overview"
import { ParentReportsPage } from "@/pages/parent/reports"
import { ParentSettingsPage } from "@/pages/parent/settings"
import { ScrollToTop } from "@/lib/scroll-to-top"

function App() {
  return (
    <ToneProvider>
      <AuthProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/schools" element={<SchoolsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/start" element={<StartPage />} />
            </Route>

            <Route path="/parent/login" element={<ParentLoginPage />} />

            <Route element={<RequireAuth />}>
              <Route element={<ParentDashboardLayout />}>
                <Route path="/parent/dashboard" element={<ParentDashboardOverview />} />
                <Route path="/parent/reports" element={<ParentReportsPage />} />
                <Route path="/parent/settings" element={<ParentSettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ToneProvider>
  )
}

export default App
