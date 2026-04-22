import Button from '../common/Button'
import Reveal from '../common/Reveal'
import heroBg from '../../assets/images/hero-nairobi.jpg'
import { useLang } from '../../context/LanguageContext'

const statValues = [
  { num: 'USD 5M', suffix: '–250M' },
  { num: '6', suffix: '+' },
  { num: '4', suffix: '' },
  { num: '100', suffix: '%' },
]

export default function HeroSection() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section aria-label="Hero" style={{
      position: 'relative',
      paddingTop: '160px',
      paddingBottom: '130px',
      color: '#fff',
      overflow: 'hidden',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <img src={heroBg} alt="" aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center 40%',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(8,25,35,0.88) 0%, rgba(8,25,35,0.72) 55%, rgba(8,25,35,0.45) 100%)',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,25,35,0.75) 0%, transparent 50%)',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '520px', height: '520px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,117,26,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <Reveal>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '14px',
            fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--color-accent-soft)', fontWeight: 700, marginBottom: '32px',
            background: 'rgba(232,117,26,0.12)',
            border: '1px solid rgba(232,117,26,0.25)',
            padding: '8px 18px', backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: '28px', height: '1px', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }} />
            {h.eyebrow}
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            color: '#fff',
            fontSize: 'clamp(2.6rem, 5.5vw, 4.25rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
            maxWidth: '860px',
          }}>
            {h.line1}{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent-soft)' }}>{h.em}</em>{' '}
            {h.line2}
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '620px',
            marginBottom: '48px',
          }}>
            {h.body}
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button to="/services" variant="primary">{h.cta1}</Button>
            <Button to="/contact" variant="outline">{h.cta2}</Button>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <div style={{
            marginTop: '96px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.14)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '40px',
          }}>
            {statValues.map(({ num, suffix }, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)',
                  color: '#fff', lineHeight: 1,
                }}>
                  {num}<span style={{ color: 'var(--color-accent)' }}>{suffix}</span>
                </div>
                <div style={{ width: '28px', height: '2px', background: 'var(--color-accent)', marginBottom: '4px' }} aria-hidden="true" />
                <div style={{
                  fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  {h.stats[i]}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
