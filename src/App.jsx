import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Philosophy from './pages/Philosophy.jsx'
import Capital from './pages/Capital.jsx'
import Sectors from './pages/Sectors.jsx'
import Partnering from './pages/Partnering.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="philosophy" element={<Philosophy />} />
          <Route path="capital" element={<Capital />} />
          <Route path="sectors" element={<Sectors />} />
          <Route path="partnering" element={<Partnering />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
