import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-removebg.png'
import { useLang } from '../../context/LanguageContext'
import { useSiteData } from '../../context/SiteDataContext'

const servicePaths = ['/services', '/services', '/services', '/services']
const quickPaths = ['/about', '/team', '/partners', '/contact']

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const { settings } = useSiteData()
  const year = new Date().getFullYear()

  const email   = settings.contact_email  || 'info@mugumocapital.com'
  const address = settings.office_address || 'Nairobi, Kenya'

  return (
    <footer className="bg-deep-navy" style={{ color: 'var(--color-ivory)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="row g-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <img
              src={logo}
              alt="Mugumo Capital Partners Limited"
              height="60"
              className="mb-3"
              style={{
                width: 'auto',
                filter: 'brightness(0) invert(1) drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
              }}
            />
            <p style={{ color: 'rgba(247,243,236,0.75)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '280px' }}>
              {f.tagline}
            </p>
            <p className="mt-3" style={{ color: 'var(--color-accent-soft)', fontSize: '0.85rem', fontWeight: 600 }}>
              {address}
            </p>
          </div>

          {/* Services Column */}
          <div className="col-lg-2 col-md-6 col-6">
            <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {f.services_title}
            </h3>
            <ul className="list-unstyled mb-0">
              {f.services.map((label, i) => (
                <li key={i} className="mb-2">
                  <Link to={servicePaths[i]} style={{ color: 'rgba(247,243,236,0.7)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-accent-soft)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(247,243,236,0.7)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="col-lg-2 col-md-6 col-6">
            <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {f.company_title}
            </h3>
            <ul className="list-unstyled mb-0">
              {f.links.map((label, i) => (
                <li key={i} className="mb-2">
                  <Link to={quickPaths[i]} style={{ color: 'rgba(247,243,236,0.7)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-accent-soft)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(247,243,236,0.7)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-lg-4 col-md-6">
            <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {f.contact_title}
            </h3>
            <div className="d-flex align-items-start gap-2 mb-3">
              <i className="bi bi-geo-alt-fill" style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }}></i>
              <span style={{ color: 'rgba(247,243,236,0.75)', fontSize: '0.9rem' }}>{address}</span>
            </div>
            <div className="d-flex align-items-start gap-2 mb-4">
              <i className="bi bi-envelope-at-fill" style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }}></i>
              <a href={`mailto:${email}`} style={{ color: 'rgba(247,243,236,0.75)', fontSize: '0.9rem' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-accent-soft)'}
                onMouseLeave={e => e.target.style.color = 'rgba(247,243,236,0.75)'}
              >
                {email}
              </a>
            </div>
            <Link to="/contact" className="btn-mugumo-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}>
              {f.send_inquiry}
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 pt-4">
          <p className="mb-0" style={{ color: 'rgba(247,243,236,0.5)', fontSize: '0.82rem' }}>
            &copy; {year} Mugumo Capital Partners Limited. {f.copyright}
          </p>
          <p className="mb-0" style={{ color: 'rgba(247,243,236,0.4)', fontSize: '0.78rem', textAlign: 'right' }}>
            {f.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
