import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'
import { useLang } from '../../context/LanguageContext'

const icons = ['bi-pin-map-fill', 'bi-diagram-3-fill', 'bi-layers-fill', 'bi-trophy-fill']

export default function WhyMugumo() {
  const { t } = useLang()
  const w = t.why

  return (
    <section className="section-py" style={{ background: 'var(--color-ivory-muted)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-heading)', fontSize: 'clamp(100px, 18vw, 200px)',
        color: 'rgba(15,43,60,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap', fontWeight: 700,
      }} aria-hidden="true">MUGUMO</div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionIntro label={w.label} title={w.heading} body={w.body} centered />
        </Reveal>

        <div className="row g-4 mt-3">
          {w.items.map(({ title, body }, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <Reveal delay={i + 1}>
                <div className="why-card">
                  <div style={{
                    width: '60px', height: '60px',
                    background: 'var(--color-navy)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '24px', position: 'relative',
                  }}>
                    <i className={`bi ${icons[i]}`} style={{ fontSize: '1.4rem', color: 'var(--color-accent)' }} />
                    <div style={{
                      position: 'absolute', bottom: '-4px', right: '-4px',
                      width: '10px', height: '10px', background: 'var(--color-accent)',
                    }} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '12px', lineHeight: 1.25 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.75, margin: 0 }}>
                    {body}
                  </p>
                  <div className="why-card-line" style={{ height: '2px', background: 'var(--color-accent)', width: '0', marginTop: '24px', transition: 'width 0.4s ease' }} aria-hidden="true" />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-card { background: #fff; padding: 2.25rem 1.75rem; height: 100%; transition: transform 0.3s ease, box-shadow 0.3s ease; border-bottom: 2px solid transparent; }
        .why-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px -20px rgba(15,43,60,0.18); border-bottom-color: var(--color-accent); }
        .why-card:hover .why-card-line { width: 100% !important; }
      `}</style>
    </section>
  )
}
