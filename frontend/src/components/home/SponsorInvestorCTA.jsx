import { Link } from 'react-router-dom'
import ctaImg from '../../assets/images/cta-investor.jpg'
import { useLang } from '../../context/LanguageContext'

export default function SponsorInvestorCTA() {
  const { t } = useLang()
  const c = t.cta_split

  return (
    <section style={{ padding: 0 }}>
      <div className="cta-split-grid">
        {/* Sponsor Panel */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(8,25,35,0.97) 0%, rgba(15,43,60,0.95) 100%)',
          padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(2.5rem, 5vw, 4.5rem)',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(232,117,26,0.18), transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} aria-hidden="true" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 700, marginBottom: '18px' }}>
              <i className="bi bi-building" /> {c.sponsor_label}
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)', lineHeight: 1.18, marginBottom: '18px' }}>
              {c.sponsor_heading}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', marginBottom: '32px', maxWidth: '420px', fontSize: '0.95rem', lineHeight: 1.8 }}>
              {c.sponsor_body}
            </p>
            <Link to="/contact" className="btn-mugumo-primary">{c.sponsor_cta}</Link>
          </div>
        </div>

        {/* Investor Panel */}
        <div style={{ position: 'relative', padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(2.5rem, 5vw, 4.5rem)', color: '#fff', overflow: 'hidden' }}>
          <img src={ctaImg} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(200,80,10,0.88) 0%, rgba(232,117,26,0.82) 100%)' }} aria-hidden="true" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginBottom: '18px' }}>
              <i className="bi bi-briefcase" /> {c.investor_label}
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)', lineHeight: 1.18, marginBottom: '18px' }}>
              {c.investor_heading}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '32px', maxWidth: '420px', fontSize: '0.95rem', lineHeight: 1.8 }}>
              {c.investor_body}
            </p>
            <Link to="/contact"
              style={{ display: 'inline-block', padding: '0.75rem 2rem', border: '1.5px solid rgba(255,255,255,0.85)', color: '#fff', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s ease', background: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--color-accent)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
            >
              {c.investor_cta}
            </Link>
          </div>
        </div>
      </div>

      <style>{`.cta-split-grid { display: grid; grid-template-columns: 1fr; } @media (min-width: 900px) { .cta-split-grid { grid-template-columns: 1fr 1fr; } }`}</style>
    </section>
  )
}
