import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'
import Button from '../common/Button'
import pppBg from '../../assets/images/ppp-bg.jpg'
import { useLang } from '../../context/LanguageContext'

export default function PPPBlock() {
  const { t } = useLang()
  const p = t.ppp

  return (
    <section className="section-py" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-ivory-muted)' }}>
      <img
        src={pppBg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: 0.06,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row g-5 align-items-start">

          {/* Left: Descriptive Content */}
          <div className="col-lg-5">
            <Reveal>
              <SectionIntro
                label={p.label}
                title={p.heading}
              />
            </Reveal>
            <Reveal delay={1}>
              <p className="text-muted-custom mb-3" style={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
                {p.p1}
              </p>
              <p className="text-muted-custom mb-4" style={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
                {p.p2}
              </p>
            </Reveal>

            <Reveal delay={2}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(15,43,60,0.1)',
                marginBottom: '28px',
              }}>
                {p.sectors.map(({ label, sub }) => (
                  <div key={label}>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.9rem',
                      color: 'var(--color-accent)',
                      marginBottom: '4px',
                      fontWeight: 600,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-muted)',
                      lineHeight: 1.4,
                    }}>
                      {sub}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={3}>
              <Button to="/contact" variant="primary">{p.cta}</Button>
            </Reveal>
          </div>

          {/* Right: Process Timeline */}
          <div className="col-lg-7">
            <Reveal delay={1}>
              <p className="section-label mb-4">{p.lifecycle}</p>
            </Reveal>
            <div className="position-relative">
              <div style={{
                position: 'absolute', left: '28px', top: '8px', bottom: '8px',
                width: '2px', background: 'linear-gradient(to bottom, var(--color-accent), rgba(232,117,26,0.1))',
              }} aria-hidden="true" />

              {p.stages.map(({ label, desc }, i) => (
                <Reveal key={i} delay={i + 1}>
                  <div className="d-flex align-items-start gap-4 mb-4">
                    <div style={{
                      width: '58px', height: '58px', borderRadius: '50%',
                      background: i === 0 ? 'var(--color-accent)' : 'var(--color-navy)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, zIndex: 1,
                      border: '3px solid var(--color-ivory-muted)',
                      boxShadow: '0 0 0 2px ' + (i === 0 ? 'var(--color-accent)' : 'var(--color-navy)'),
                    }}>
                      <span style={{ color: 'white', fontSize: '0.72rem', fontWeight: 700 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="pt-1">
                      <p className="mb-1" style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.95rem' }}>{label}</p>
                      <p className="mb-0" style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
