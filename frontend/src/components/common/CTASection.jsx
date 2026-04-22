import Button from './Button'
import { useLang } from '../../context/LanguageContext'

export default function CTASection({
  title,
  body,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  dark = true,
}) {
  const { t } = useLang()

  return (
    <section
      className="section-py"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: dark
          ? 'var(--color-deep-navy)'
          : 'var(--color-ivory)',
      }}
    >
      {dark && (
        <>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }} aria-hidden="true" />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '500px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(232,117,26,0.12), transparent 70%)',
            pointerEvents: 'none',
          }} aria-hidden="true" />
        </>
      )}

      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: dark ? 'var(--color-accent-soft)' : 'var(--color-accent)',
          fontWeight: 700, marginBottom: '16px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
          {t.cta_section.eyebrow}
          <span style={{ width: '24px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          color: dark ? '#fff' : 'var(--color-navy)',
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          lineHeight: 1.15,
          marginBottom: '16px',
          maxWidth: '700px',
          margin: '0 auto 16px',
        }}>
          {title}
        </h2>
        {body && (
          <p style={{
            color: dark ? 'rgba(255,255,255,0.75)' : 'var(--color-muted)',
            marginBottom: '36px',
            maxWidth: '560px',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            lineHeight: 1.8,
            margin: '0 auto 36px',
          }}>
            {body}
          </p>
        )}
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {primaryLabel && primaryTo && (
            <Button to={primaryTo} variant="primary">{primaryLabel}</Button>
          )}
          {secondaryLabel && secondaryTo && (
            <Button to={secondaryTo} variant="outline">{secondaryLabel}</Button>
          )}
        </div>
      </div>
    </section>
  )
}
