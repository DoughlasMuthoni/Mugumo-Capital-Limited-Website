import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'

export default function PartnershipModel() {
  return (
    <section className="bg-ivory-muted section-py">
      <div className="container">
        <Reveal>
          <SectionIntro
            label="How We Collaborate"
            title="The Mugumo Collaboration Model"
            body="We serve as the bridge between project sponsors seeking capital and institutional investors and lenders seeking credible, structured opportunities."
            centered
          />
        </Reveal>

        {/* Model diagram */}
        <Reveal delay={1}>
          <div className="row g-0 align-items-stretch mt-5 justify-content-center">

            {/* Sponsor side */}
            <div className="col-lg-3 col-md-4">
              <div
                style={{
                  background: 'var(--color-navy)',
                  borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
                  padding: '2.5rem 2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <i className="bi bi-person-workspace mb-3" style={{ fontSize: '2.5rem', color: 'var(--color-accent)' }}></i>
                <h3 className="heading-serif text-white mb-3" style={{ fontSize: '1.1rem' }}>Project Sponsors</h3>
                <ul className="list-unstyled mb-0" style={{ color: 'rgba(247,243,236,0.7)', fontSize: '0.82rem', lineHeight: 1.8 }}>
                  <li>Developers</li>
                  <li>Governments</li>
                  <li>MFIs</li>
                  <li>IPPs</li>
                  <li>PPP Authorities</li>
                </ul>
              </div>
            </div>

            {/* Mugumo hub */}
            <div className="col-lg-4 col-md-4">
              <div
                style={{
                  background: 'var(--color-accent)',
                  padding: '2.5rem 2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1), transparent 70%)',
                }} aria-hidden="true" />
                <p className="mb-2" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>Advisory Hub</p>
                <h3 className="heading-serif text-white mb-3" style={{ fontSize: '1.375rem' }}>Mugumo Capital Partners</h3>
                <div className="d-flex flex-wrap gap-1 justify-content-center">
                  {['Structuring', 'Advisory', 'Placement', 'Due Diligence', 'Modelling'].map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '100px',
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.75rem',
                      color: 'white',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Investor side */}
            <div className="col-lg-3 col-md-4">
              <div
                style={{
                  background: 'var(--color-deep-navy)',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                  padding: '2.5rem 2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <i className="bi bi-bank mb-3" style={{ fontSize: '2.5rem', color: 'var(--color-accent)' }}></i>
                <h3 className="heading-serif text-white mb-3" style={{ fontSize: '1.1rem' }}>Capital Providers</h3>
                <ul className="list-unstyled mb-0" style={{ color: 'rgba(247,243,236,0.7)', fontSize: '0.82rem', lineHeight: 1.8 }}>
                  <li>DFIs & Multilaterals</li>
                  <li>Pension Funds</li>
                  <li>Impact Investors</li>
                  <li>Commercial Banks</li>
                  <li>Infrastructure Funds</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Values below the diagram */}
        <div className="row g-4 mt-5">
          {[
            { icon: 'bi-rocket-takeoff-fill', title: 'Transaction Origination', desc: 'We identify and qualify investment-grade mandates in our core sectors.' },
            { icon: 'bi-layers-fill', title: 'Structure Design', desc: 'We design capital structures that are bankable, efficient, and appropriate for the risk profile.' },
            { icon: 'bi-send-fill', title: 'Investor Placement', desc: 'We present structured mandates to our network of investors and lenders with precision.' },
            { icon: 'bi-patch-check-fill', title: 'Close Support', desc: 'We manage the process through to financial close — coordinating all parties to the transaction.' },
          ].map(({ icon, title, desc }, i) => (
            <div key={title} className="col-lg-3 col-md-6">
              <Reveal delay={i + 1}>
                <div className="text-center" style={{ padding: '1.5rem 1rem' }}>
                  <div className="icon-circle mx-auto mb-3">
                    <i className={`bi ${icon}`}></i>
                  </div>
                  <h4 className="heading-serif mb-2" style={{ fontSize: '1rem' }}>{title}</h4>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
