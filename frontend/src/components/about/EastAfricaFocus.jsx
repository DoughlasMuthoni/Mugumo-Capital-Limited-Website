import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'

const countries = [
  { name: 'Kenya', note: 'Headquarters & Primary Market', flag: '🇰🇪' },
  { name: 'Uganda', note: 'Active Market Coverage', flag: '🇺🇬' },
  { name: 'Tanzania', note: 'Active Market Coverage', flag: '🇹🇿' },
  { name: 'Rwanda', note: 'Active Market Coverage', flag: '🇷🇼' },
  { name: 'Ethiopia', note: 'Emerging Opportunities', flag: '🇪🇹' },
  { name: 'Wider East Africa', note: 'Regional Mandates', flag: '🌍' },
]

export default function EastAfricaFocus() {
  return (
    <section className="bg-ivory-muted section-py">
      <div className="container">
        <Reveal>
          <SectionIntro
            label="Regional Focus"
            title="Built for East Africa"
            body="Our geographic focus is deliberate. The East African Community represents one of the world's most dynamic emerging market regions — and one of the most underserved by specialised capital advisory."
            centered
          />
        </Reveal>

        <div className="row g-3 mt-4 justify-content-center">
          {countries.map(({ name, note, flag }, i) => (
            <div key={name} className="col-lg-4 col-md-6">
              <Reveal delay={i + 1}>
                <div
                  className="mugumo-card"
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}
                >
                  <span style={{ fontSize: '2rem', flexShrink: 0 }} role="img" aria-label={name}>{flag}</span>
                  <div>
                    <p className="mb-0" style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '1rem' }}>{name}</p>
                    <p className="mb-0" style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>{note}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={3}>
          <div
            className="mt-5 text-center p-4 p-md-5"
            style={{
              background: 'var(--color-navy)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '800px',
              margin: '3rem auto 0',
            }}
          >
            <i className="bi bi-globe-americas mb-3 d-block" style={{ fontSize: '2rem', color: 'var(--color-accent)' }}></i>
            <h3 className="heading-serif text-white mb-3" style={{ fontSize: '1.375rem' }}>
              Our Conviction About East Africa
            </h3>
            <p style={{ color: 'rgba(247,243,236,0.78)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              The capital needs of East Africa's infrastructure, housing, and energy sectors are significant
              and growing. We believe that advisors with local market knowledge, regional relationships,
              and sector specialisation are essential to bridging the gap between credible projects and
              institutional capital.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
