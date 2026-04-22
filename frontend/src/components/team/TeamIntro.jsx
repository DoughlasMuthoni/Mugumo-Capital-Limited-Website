import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'

export default function TeamIntro() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <Reveal>
              <SectionIntro
                label="Our Leadership"
                title="Built on Regional Expertise"
                centered
              />
            </Reveal>
            <Reveal delay={1}>
              <p className="text-muted-custom mb-4" style={{ lineHeight: 1.85, fontSize: '1.025rem' }}>
                The Mugumo Capital Partners leadership team brings together professionals with backgrounds in project finance,
                development banking, infrastructure advisory, and capital markets across East Africa. Our collective experience
                spans government, private sector, and international development finance — giving us a perspective that is
                both grounded and globally informed.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-muted-custom mb-5" style={{ lineHeight: 1.85, fontSize: '0.975rem' }}>
                We believe credibility is built through results and relationships, not credentials alone.
                Our approach to every mandate reflects a combination of technical rigour, market knowledge,
                and honest engagement with clients and counterparties.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Philosophy pillars */}
        <div className="row g-4 justify-content-center">
          {[
            { icon: 'bi-compass-fill', title: 'Regional Conviction', desc: 'Deep understanding of East African markets, regulation, and development finance ecosystems.' },
            { icon: 'bi-patch-check-fill', title: 'Relational Integrity', desc: 'We build long-term relationships with clients, investors, and counterparties based on transparency and delivery.' },
            { icon: 'bi-graph-up-arrow', title: 'Transaction Discipline', desc: 'Every mandate is approached with institutional-grade rigour — from first engagement through financial close.' },
          ].map(({ icon, title, desc }, i) => (
            <div key={title} className="col-lg-4 col-md-6">
              <Reveal delay={i + 2}>
                <div className="mugumo-card text-center h-100">
                  <div className="icon-circle mx-auto mb-3">
                    <i className={`bi ${icon}`}></i>
                  </div>
                  <h3 className="heading-serif mb-2" style={{ fontSize: '1.1rem' }}>{title}</h3>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.875rem', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
