import { useEffect, useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import { useSiteData } from '../../context/SiteDataContext'

const WA_MSG = 'Hello, I would like to enquire about Mugumo Capital Partners services.'

export default function FloatingButtons() {
  const { t } = useLang()
  const { settings } = useSiteData()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const waNumber = settings.whatsapp_number || '254700000000'
  const waUrl    = `https://wa.me/${waNumber}?text=${encodeURIComponent(WA_MSG)}`

  return (
    <>
      <div style={{
        position: 'fixed', bottom: '28px', right: '24px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '12px', zIndex: 999,
      }}>
        <button
          onClick={scrollToTop}
          aria-label={t.back_to_top}
          title={t.back_to_top}
          style={{
            width: '46px', height: '46px', borderRadius: '50%',
            border: 'none', background: 'var(--color-navy)', color: '#fff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(15,43,60,0.35)',
            opacity: showTop ? 1 : 0,
            transform: showTop ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: showTop ? 'auto' : 'none',
          }}>
          <i className="bi bi-arrow-up-circle-fill" style={{ fontSize: '1.25rem' }} />
        </button>

        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          aria-label={t.whatsapp_tooltip} title={t.whatsapp_tooltip}
          className="whatsapp-btn"
          style={{
            width: '54px', height: '54px', borderRadius: '50%',
            background: '#25D366', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
            textDecoration: 'none', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)' }}
        >
          <i className="bi bi-whatsapp" style={{ fontSize: '1.6rem' }} />
        </a>
      </div>

      <style>{`
        .whatsapp-btn::before {
          content: '';
          position: absolute;
          width: 54px; height: 54px;
          border-radius: 50%;
          background: rgba(37,211,102,0.4);
          animation: wa-pulse 2s ease-out infinite;
        }
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
    </>
  )
}
