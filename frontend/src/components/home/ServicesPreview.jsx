import { Link } from 'react-router-dom'
import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'
import { useLang } from '../../context/LanguageContext'

const icons = ['bi-house-heart-fill', 'bi-sun-fill', 'bi-buildings-fill', 'bi-cash-coin']

export default function ServicesPreview() {
  const { t } = useLang()
  const s = t.services_preview

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <Reveal>
          <SectionIntro
            label={s.label}
            title={s.heading}
            body={s.body}
            centered
          />
        </Reveal>

        <div className="row g-4 mt-2">
          {s.items.map(({ category, title, body, bullets }, idx) => (
            <div key={idx} className="col-lg-6">
              <Reveal delay={idx + 1}>
                <div style={{
                  background: 'var(--color-ivory)',
                  borderTop: '3px solid var(--color-accent)',
                  padding: '2.5rem 2rem',
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 24px 48px -20px rgba(15,43,60,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      width: '44px', height: '44px', flexShrink: 0,
                      background: 'var(--color-accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <i className={`bi ${icons[idx]}`} style={{ fontSize: '1.2rem', color: '#fff' }} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.78rem',
                      color: 'var(--color-accent)',
                      letterSpacing: '0.12em',
                    }}>
                      0{idx + 1} / {category}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                    color: 'var(--color-navy)',
                    marginBottom: '12px',
                    lineHeight: 1.25,
                  }}>
                    {title}
                  </h3>

                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.75,
                    marginBottom: '0',
                  }}>
                    {body}
                  </p>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(15,43,60,0.1)',
                  }}>
                    {bullets.map((item, bi) => (
                      <li key={bi} style={{
                        fontSize: '0.865rem',
                        color: 'var(--color-body)',
                        padding: '6px 0 6px 20px',
                        position: 'relative',
                        lineHeight: 1.5,
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          top: '14px',
                          width: '10px',
                          height: '1px',
                          background: 'var(--color-accent)',
                          display: 'inline-block',
                        }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/services"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--color-accent)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      marginTop: '20px',
                      textDecoration: 'none',
                      transition: 'gap 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                    onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                  >
                    {s.learn} <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
