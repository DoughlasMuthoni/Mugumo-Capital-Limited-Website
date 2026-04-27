import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'
import { useLang } from '../../context/LanguageContext'
import { useSiteData } from '../../context/SiteDataContext'

// Cycles when there are more cards than icons
const FALLBACK_ICONS = [
  'bi-pin-map-fill', 'bi-diagram-3-fill', 'bi-layers-fill', 'bi-trophy-fill',
  'bi-shield-check-fill', 'bi-briefcase-fill', 'bi-bar-chart-fill', 'bi-globe',
]

function resolveItems(settings, defaults) {
  // Prefer new JSON key (set by dynamic admin)
  if (settings.why_items) {
    try {
      const p = JSON.parse(settings.why_items)
      if (Array.isArray(p) && p.length) {
        return p.map((it, i) => ({
          icon:  it.icon  || FALLBACK_ICONS[i % FALLBACK_ICONS.length],
          title: it.title || '',
          body:  it.body  || '',
        }))
      }
    } catch (_) {}
  }
  // Fall back to individual keys (old format)
  return defaults.map((def, i) => ({
    icon:  FALLBACK_ICONS[i % FALLBACK_ICONS.length],
    title: settings[`why_item_${i + 1}_title`] || def.title,
    body:  settings[`why_item_${i + 1}_body`]  || def.body,
  }))
}

export default function WhyMugumo() {
  const { t } = useLang()
  const { settings } = useSiteData()
  const w = t.why

  const label   = settings.why_label   || w.label
  const heading = settings.why_heading || w.heading
  const body    = settings.why_body    || w.body
  const items   = resolveItems(settings, w.items)

  // Responsive column class: 4 per row up to 4 items, 3 per row for 5+
  const colClass = items.length > 4 ? 'col-xl-3 col-lg-4 col-md-6' : 'col-lg-3 col-md-6'

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
          <SectionIntro label={label} title={heading} body={body} centered />
        </Reveal>

        <div className="row g-4 mt-3">
          {items.map(({ icon, title, body: itemBody }, i) => (
            <div key={i} className={colClass}>
              <Reveal delay={i + 1}>
                <div className="why-card">
                  <div style={{
                    width: '60px', height: '60px',
                    background: 'var(--color-navy)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '24px', position: 'relative',
                  }}>
                    <i className={`bi ${icon}`} style={{ fontSize: '1.4rem', color: 'var(--color-accent)' }} />
                    <div style={{
                      position: 'absolute', bottom: '-4px', right: '-4px',
                      width: '10px', height: '10px', background: 'var(--color-accent)',
                    }} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '12px', lineHeight: 1.25 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.75, margin: 0 }}>
                    {itemBody}
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
