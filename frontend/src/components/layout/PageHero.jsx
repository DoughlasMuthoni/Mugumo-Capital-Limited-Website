import { Link } from 'react-router-dom'

export default function PageHero({ title, subtitle, backgroundImage }) {
  return (
    <section
      aria-label={`${title} page hero`}
      style={{
        position: 'relative',
        minHeight: '340px',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '5rem 0 3.5rem',
        overflow: 'hidden',
        backgroundColor: 'var(--color-deep-navy)',
      }}
    >
      {/* Background image */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
        />
      )}

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(110deg, rgba(8,25,35,0.88) 0%, rgba(8,25,35,0.72) 60%, rgba(8,25,35,0.55) 100%)',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,25,35,0.7) 0%, transparent 60%)',
      }} aria-hidden="true" />

      {/* Accent glow */}
      <div style={{
        position: 'absolute', bottom: 0, right: '10%',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(232,117,26,0.15), transparent 65%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--color-accent-soft)', fontWeight: 700,
          marginBottom: '16px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
          {subtitle}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          color: '#fff',
          fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '20px',
        }}>
          {title}
        </h1>

        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb mb-0" style={{ gap: '6px' }}>
            <li className="breadcrumb-item">
              <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page"
              style={{ color: 'var(--color-accent-soft)', fontSize: '0.82rem', fontWeight: 500 }}>
              {title}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  )
}
