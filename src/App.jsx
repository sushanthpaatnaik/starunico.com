import { Navigate, Route, Routes } from 'react-router-dom'
import { PATHS, REDIRECTS } from './lib/routes.js'
import { AppearanceProvider } from './components/Appearance.jsx'
import AppearanceDebug from './components/AppearanceDebug.jsx'
import DocumentHead from './components/DocumentHead.jsx'
import Layout from './components/Layout.jsx'
import PageTransition from './components/PageTransition.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import Home from './pages/Home.jsx'
import Thesis from './pages/Thesis.jsx'
import Capital from './pages/Capital.jsx'
import Approach from './pages/Approach.jsx'
import Portfolio from './pages/Portfolio.jsx'
import PortfolioCompany from './pages/PortfolioCompany.jsx'
import About from './pages/About.jsx'
import Founders from './pages/Founders.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <PageTransition>
      <AppearanceProvider>
        <AppearanceDebug />
        <DocumentHead />
        <ScrollManager />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="thesis" element={<Thesis />} />
            <Route path="capital" element={<Capital />} />
            <Route path="approach" element={<Approach />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="portfolio/:slug" element={<PortfolioCompany />} />
            <Route path="about" element={<About />} />
            <Route path="founders" element={<Founders />} />
            {/* Older paths that were linked before the rebuild. */}
            <Route path="contact" element={<Navigate to="/founders" replace />} />
            <Route path="philosophy" element={<Navigate to="/thesis" replace />} />
            <Route path="sectors" element={<Navigate to="/thesis" replace />} />
            <Route path="partnering" element={<Navigate to="/approach" replace />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          </Routes>
      </AppearanceProvider>
    </PageTransition>
  )
}
