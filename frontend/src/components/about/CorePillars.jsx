import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'

const pillars = [
  {
    icon: 'bi-pin-map-fill',
    title: 'Local Expertise',
    body: 'Our advisors bring deep knowledge of East African capital markets, development finance institutions, regulatory environments, and investment ecosystems. We do not import generic advisory — we provide regionally grounded guidance.',
    delay: 1,
  },
  {
    icon: 'bi-award-fill',
    title: 'Institutional Discipline',
    body: 'We apply the same rigour to a Kenyan affordable housing mandate as a DFI would expect from a global advisory firm. Our work products — financial models, investor memoranda, due diligence responses — meet institutional standards.',
    delay: 2,
  },
  {
    icon: 'bi-crosshair2',
    title: 'Sector Focus',
    body: 'We specialise in four sectors and four only: housing, energy, PPP, and microfinance. That focus means our knowledge is deep rather than broad, and our investor relationships are calibrated to the sectors we serve.',
    delay: 3,
  },
  {
    icon: 'bi-diagram-3-fill',
    title: 'Regional Network',
    body: 'Years of operating across East Africa have given us a network of project sponsors, government counterparts, DFI contacts, institutional investors, and legal advisors that spans Kenya, Uganda, Tanzania, Rwanda, and beyond.',
    delay: 4,
  },
]

export default function CorePillars() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <Reveal>
          <SectionIntro
            label="Our Pillars"
            title="The Foundation of How We Work"
            centered
          />
        </Reveal>
        <div className="row g-4 mt-2">
          {pillars.map(({ icon, title, body, delay }) => (
            <div key={title} className="col-lg-6">
              <Reveal delay={delay}>
                <div className="mugumo-card h-100">
                  <div className="icon-circle mb-3">
                    <i className={`bi ${icon}`}></i>
                  </div>
                  <h3 className="heading-serif mb-3" style={{ fontSize: '1.25rem' }}>{title}</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: 1.8, fontSize: '0.95rem' }}>{body}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
