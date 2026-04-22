import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header        from '../components/layout/Header'
import Footer        from '../components/layout/Footer'
import FloatingButtons from '../components/common/FloatingButtons'
import Home          from '../pages/Home'
import About         from '../pages/About'
import Team          from '../pages/Team'
import Services      from '../pages/Services'
import Partners      from '../pages/Partners'
import Contact       from '../pages/Contact'
import AdminApp      from '../admin/AdminApp'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function MainSite() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/team"     element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — own auth context and layout, no main site chrome */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public site */}
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  )
}
