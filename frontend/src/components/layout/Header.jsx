import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo-color.png'
import { useLang } from '../../context/LanguageContext'

const navPaths = [
  { key: 'home',     path: '/' },
  { key: 'about',    path: '/about' },
  { key: 'team',     path: '/team' },
  { key: 'services', path: '/services' },
  { key: 'partners', path: '/partners' },
  { key: 'contact',  path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLang, t } = useLang()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#fff',
        borderBottom: scrolled
          ? '1px solid rgba(15,43,60,0.12)'
          : '1px solid rgba(15,43,60,0.07)',
        boxShadow: scrolled ? '0 2px 24px rgba(15,43,60,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '110px',
          }}>

            {/* Logo */}
            <NavLink to="/" aria-label="Mugumo Capital Partners — Home"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img
                src={logo}
                alt="Mugumo Capital Partners Limited"
                style={{ height: '100px', width: 'auto', display: 'block' }}
              />
            </NavLink>

            {/* Desktop nav */}
            <nav aria-label="Primary navigation"
              style={{ display: 'flex', alignItems: 'center' }}
              className="d-none d-lg-flex">

              {navPaths.map(({ key, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className="header-nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--color-accent)' : 'var(--color-navy)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    padding: '4px 0',
                    margin: '0 14px',
                    position: 'relative',
                    transition: 'color 0.2s ease',
                  })}
                >
                  {t.nav[key]}
                </NavLink>
              ))}

              {/* Language toggle */}
              <button
                onClick={toggleLang}
                aria-label={`Switch to ${lang === 'en' ? 'French' : 'English'}`}
                className="lang-toggle"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginLeft: '10px',
                  background: 'none',
                  border: '1.5px solid rgba(15,43,60,0.2)',
                  color: 'var(--color-navy)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderRadius: '3px',
                }}
              >
                <i className="bi bi-translate" style={{ fontSize: '0.85rem' }} />
                {lang === 'en' ? 'FR' : 'EN'}
              </button>

              <NavLink
                to="/contact"
                className="btn-mugumo-primary ms-3"
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.76rem', letterSpacing: '0.1em' }}
              >
                {t.nav.engage}
              </NavLink>
            </nav>

            {/* Mobile right controls */}
            <div className="d-lg-none" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Mobile lang toggle */}
              <button
                onClick={toggleLang}
                aria-label={`Switch to ${lang === 'en' ? 'French' : 'English'}`}
                style={{
                  background: 'none',
                  border: '1.5px solid rgba(15,43,60,0.2)',
                  color: 'var(--color-navy)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '5px 8px',
                  cursor: 'pointer',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <i className="bi bi-translate" style={{ fontSize: '0.8rem' }} />
                {lang === 'en' ? 'FR' : 'EN'}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                style={{
                  background: 'none',
                  border: '1.5px solid rgba(15,43,60,0.25)',
                  color: 'var(--color-navy)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  lineHeight: 1,
                  borderRadius: '4px',
                }}
              >
                <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'} fs-5`}
                  style={{ color: 'var(--color-navy)' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '600px' : '0',
          transition: 'max-height 0.35s ease',
          background: '#fff',
          borderTop: menuOpen ? '1px solid rgba(15,43,60,0.08)' : 'none',
        }}>
          <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
            {navPaths.map(({ key, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '0.8rem 0',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-navy)',
                  borderBottom: '1px solid rgba(15,43,60,0.07)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                })}
              >
                {t.nav[key]}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-mugumo-primary d-block text-center mt-4"
              style={{ fontSize: '0.85rem' }}
            >
              {t.nav.engage}
            </NavLink>
          </div>
        </div>
      </header>

      <style>{`
        .header-nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          height: 2px; width: 0;
          background: var(--color-accent);
          transition: width 0.25s ease;
        }
        .header-nav-link:hover::after { width: 100%; }
        .header-nav-link:hover { color: var(--color-accent) !important; }
        .lang-toggle:hover {
          background: var(--color-navy) !important;
          color: #fff !important;
          border-color: var(--color-navy) !important;
        }
      `}</style>
    </>
  )
}
