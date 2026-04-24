import Reveal from '../common/Reveal'
import Button from '../common/Button'

import imgHousing from '../../assets/images/apartments.jpg'
import imgEnergy from '../../assets/images/service-energy.jpg'
import imgPPP from '../../assets/images/service-ppp.jpg'
import imgMicrofinance from '../../assets/images/service-microfinance.jpg'

const serviceImages = {
  'affordable-housing': imgHousing,
  'renewable-energy': imgEnergy,
  'ppp-advisory': imgPPP,
  'microfinance': imgMicrofinance,
}

export default function ServiceDetailBlock({ id, icon, title, overview, clientTypes, transactionScope, structuringThemes, imageUrl = '', reversed = false }) {
  const serviceImage = imageUrl || serviceImages[id]

  const contentCol = (
    <div className={`col-lg-7 ${reversed ? 'order-lg-1' : ''}`}>
      <Reveal>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-accent)', fontWeight: 700, marginBottom: '16px',
        }}>
          <span style={{ width: '24px', height: '1.5px', background: 'var(--color-accent)', display: 'inline-block' }} />
          Advisory Service
        </div>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div style={{
            width: '56px', height: '56px', flexShrink: 0,
            background: 'var(--color-navy)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className={`bi ${icon}`} style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}></i>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
            color: 'var(--color-navy)',
            lineHeight: 1.2,
            margin: 0,
          }}>
            {title}
          </h2>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <p style={{ lineHeight: 1.85, fontSize: '0.975rem', color: 'var(--color-muted)', marginBottom: '28px' }}>
          {overview}
        </p>
      </Reveal>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <Reveal delay={2}>
            <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
              Ideal Clients
            </p>
            <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none' }}>
              {clientTypes.map(item => (
                <li key={item} style={{
                  color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '6px',
                  paddingLeft: '16px', position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, top: '12px', width: '6px', height: '1.5px', background: 'var(--color-accent)', display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="col-md-6">
          <Reveal delay={3}>
            <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
              Transaction Scope
            </p>
            <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none' }}>
              {transactionScope.map(item => (
                <li key={item} style={{
                  color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '6px',
                  paddingLeft: '16px', position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, top: '12px', width: '6px', height: '1.5px', background: 'var(--color-accent)', display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal delay={4}>
        <div className="mb-4">
          <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            Structuring Themes
          </p>
          <div className="d-flex flex-wrap gap-2">
            {structuringThemes.map(tag => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={5}>
        <Button to="/contact" variant="primary">Discuss This Service</Button>
      </Reveal>
    </div>
  )

  const imageCol = (
    <div className={`col-lg-5 d-flex align-items-stretch ${reversed ? 'order-lg-2' : ''}`}>
      <Reveal delay={2} className="w-100">
        <div style={{ position: 'relative', width: '100%', minHeight: '420px', overflow: 'hidden' }}>
          {serviceImage ? (
            <>
              <img
                src={serviceImage}
                alt={title}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.5s ease',
                }}
                className="service-img"
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,25,35,0.85) 0%, rgba(8,25,35,0.3) 60%, transparent 100%)',
              }} aria-hidden="true" />
              {/* Bottom content */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '2rem',
                zIndex: 1,
              }}>
                <div style={{
                  background: 'rgba(232,117,26,0.9)',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px',
                  marginBottom: '12px',
                }}>
                  <i className={`bi ${icon}`} style={{ color: '#fff', fontSize: '0.9rem' }} />
                  <span style={{ color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {title.split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', margin: 0 }}>
                  info@mugumocapital.com
                </p>
              </div>
            </>
          ) : (
            <div style={{
              background: 'var(--color-navy)',
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '3rem 2.5rem',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at bottom left, rgba(232,117,26,0.15), transparent 70%)',
              }} aria-hidden="true" />
              <i className={`bi ${icon}`} style={{ fontSize: '5rem', color: 'var(--color-accent)', opacity: 0.4 }} />
            </div>
          )}
        </div>
      </Reveal>
    </div>
  )

  return (
    <section
      id={id}
      className="section-py"
      style={{
        backgroundColor: 'var(--color-white)',
        scrollMarginTop: '80px',
        borderTop: '1px solid var(--color-ivory-muted)',
      }}
    >
      <div className="container">
        <div className="row g-5 align-items-stretch">
          {reversed ? <>{imageCol}{contentCol}</> : <>{contentCol}{imageCol}</>}
        </div>
      </div>

      <style>{`
        .service-img {
          transition: transform 0.6s ease !important;
        }
        section:hover .service-img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  )
}
