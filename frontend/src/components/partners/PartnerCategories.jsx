import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'

const categories = [
  {
    icon: 'bi-rocket-takeoff-fill',
    title: 'Project Sponsors & Developers',
    desc: 'We work with private sector developers, project companies, and special purpose vehicles that need to raise capital for viable projects in our focus sectors.',
    delay: 1,
  },
  {
    icon: 'bi-safe2-fill',
    title: 'Institutional Investors',
    desc: 'Pension funds, insurance companies, infrastructure funds, and family offices seeking exposure to East African housing, energy, and infrastructure assets.',
    delay: 2,
  },
  {
    icon: 'bi-globe2',
    title: 'Development Finance Institutions',
    desc: 'DFIs and multilateral agencies with mandates to support housing, renewable energy, PPP, and financial inclusion in East Africa and the wider continent.',
    delay: 3,
  },
  {
    icon: 'bi-bank2',
    title: 'Commercial Banks & Lenders',
    desc: 'Local and regional commercial banks, bond markets, and structured credit providers who participate in syndicated facilities and project finance transactions.',
    delay: 4,
  },
  {
    icon: 'bi-person-check-fill',
    title: 'Microfinance Institutions',
    desc: 'Regulated MFIs, SACCOs, and cooperative financial institutions seeking institutional capital to grow their loan portfolios and expand their client reach.',
    delay: 5,
  },
  {
    icon: 'bi-buildings-fill',
    title: 'PPP Contracting Authorities',
    desc: 'National and county governments, public agencies, and government entities that are the public sector counterpart in PPP concession transactions.',
    delay: 6,
  },
]

export default function PartnerCategories() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <Reveal>
          <SectionIntro
            label="Who We Work With"
            title="Our Counterparty Ecosystem"
            body="Mugumo Capital Partners operates at the intersection of project sponsors and capital providers — working with a defined set of counterparty types across every mandate."
            centered
          />
        </Reveal>

        <div className="row g-4 mt-3">
          {categories.map(({ icon, title, desc, delay }) => (
            <div key={title} className="col-lg-4 col-md-6">
              <Reveal delay={delay}>
                <div className="mugumo-card h-100">
                  <div className="icon-circle mb-3">
                    <i className={`bi ${icon}`}></i>
                  </div>
                  <h3 className="heading-serif mb-2" style={{ fontSize: '1.15rem' }}>{title}</h3>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
