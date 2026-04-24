import Reveal from '../common/Reveal'
import Button from '../common/Button'
import aboutImg from '../../assets/images/nairobi-city.jpeg'
import { useLang } from '../../context/LanguageContext'

const icons = ['bi-graph-up-arrow', 'bi-building', 'bi-bank']

export default function HomeAboutPreview() {
  const { t } = useLang()
  const a = t.about_preview

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-white)', overflow: 'hidden' }}>
      <div className="container">
        <div className="row g-5 align-items-center">

          {/* Photo column — visible from md up */}
          <div className="col-lg-6 d-none d-md-block">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  right: '-24px',
                  bottom: '-24px',
                  border: '2px solid var(--color-accent)',
                  zIndex: 0,
                }} aria-hidden="true" />

                <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
                  <img
                    src={aboutImg}
                    alt="Capital advisory meeting in East Africa"
                    style={{
                      width: '100%',
                      aspectRatio: '4/5',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(8,25,35,0.5), transparent)',
                  }} aria-hidden="true" />

                  <div style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    background: 'var(--color-accent)',
                    color: '#fff',
                    padding: '12px 20px',
                  }}>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85 }}>
                      {a.hq}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700 }}>
                      {a.nairobi}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="col-lg-6">
            <Reveal delay={1}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '20px',
              }}>
                <span style={{ width: '24px', height: '1.5px', background: 'var(--color-accent)', display: 'inline-block' }} />
                {a.label}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.85rem, 3vw, 2.6rem)',
                lineHeight: 1.1,
                color: 'var(--color-navy)',
                marginBottom: '24px',
              }}>
                {a.heading}
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p style={{ lineHeight: 1.85, marginBottom: '18px', color: 'var(--color-muted)', fontSize: '0.975rem' }}>
                {a.p1}
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '36px', color: 'var(--color-muted)', fontSize: '0.975rem' }}>
                {a.p2}
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0',
                paddingTop: '28px',
                borderTop: '1px solid rgba(15,43,60,0.1)',
                marginBottom: '36px',
              }}>
                {a.pillars.map((label, i) => (
                  <div key={i} style={{
                    padding: '20px 16px 20px 0',
                    borderRight: i < 2 ? '1px solid rgba(15,43,60,0.1)' : 'none',
                    paddingRight: i < 2 ? '16px' : '0',
                    marginRight: i < 2 ? '16px' : '0',
                  }}>
                    <i className={`bi ${icons[i]}`} style={{ fontSize: '1.3rem', color: 'var(--color-accent)', display: 'block', marginBottom: '10px' }} />
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.5rem',
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}>
                      0{i + 1}
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-muted)',
                      lineHeight: 1.3,
                    }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={4}>
              <Button to="/about" variant="outline-navy">{a.cta}</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
