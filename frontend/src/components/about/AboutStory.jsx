import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'
import aboutImg from '../../assets/images/about-meeting.jpg'

export default function AboutStory() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <div className="row g-5 align-items-start">

          {/* Left: image + stats overlay */}
          <div className="col-lg-5">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <img
                  src={aboutImg}
                  alt="Mugumo Capital Partners advisory"
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
                {/* Dark gradient at bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '55%',
                  background: 'linear-gradient(to top, rgba(8,25,35,0.9) 0%, rgba(8,25,35,0.4) 60%, transparent 100%)',
                }} aria-hidden="true" />

                {/* Floating stats grid */}
                <div style={{
                  position: 'absolute',
                  bottom: '28px', left: '24px', right: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                }}>
                  {[
                    { label: 'Countries Covered', value: '6+' },
                    { label: 'Sectors Served', value: '4' },
                    { label: 'Focus Region', value: 'EAC' },
                    { label: 'Mandate Type', value: 'B2B' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{
                      background: 'rgba(8,25,35,0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '12px 14px',
                      textAlign: 'center',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.6rem',
                        color: 'var(--color-accent-soft)',
                        margin: 0, lineHeight: 1,
                      }}>{value}</p>
                      <p style={{
                        fontSize: '0.7rem', color: 'rgba(247,243,236,0.6)',
                        letterSpacing: '0.05em', margin: '4px 0 0',
                      }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Location badge */}
                <div style={{
                  position: 'absolute', top: '20px', left: '20px',
                  background: 'var(--color-accent)',
                  padding: '6px 14px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <i className="bi bi-geo-alt-fill" style={{ color: '#fff', fontSize: '0.75rem' }} />
                  <span style={{ color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    Nairobi, Kenya
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Narrative */}
          <div className="col-lg-7">
            <Reveal delay={1}>
              <SectionIntro
                label="Our Story"
                title="Who We Are"
                body="Mugumo Capital Partners Limited is a Nairobi-headquartered capital advisory and project finance firm. We are built around the premise that East Africa's most impactful projects — in housing, clean energy, infrastructure, and inclusive finance — deserve access to institutional-grade capital and advisory support."
              />
            </Reveal>
            <Reveal delay={2}>
              <p style={{ lineHeight: 1.85, marginBottom: '28px', color: 'var(--color-muted)', fontSize: '0.975rem' }}>
                We focus exclusively on the East African Community and wider region, working with project
                sponsors, developers, governments, and financial institutions who are serious about
                executing transformational mandates. Our advisory is business-to-business — we do not
                serve retail clients and we do not operate as a financial institution.
              </p>
            </Reveal>

            {/* What we do / don't do */}
            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <Reveal delay={3}>
                  <div style={{
                    background: 'var(--color-ivory)',
                    borderLeft: '3px solid var(--color-accent)',
                    padding: '1.5rem',
                  }}>
                    <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
                      What We Do
                    </p>
                    <ul className="list-unstyled mb-0" style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                      {['Capital raising and structuring', 'PPP transaction advisory', 'Investor identification and engagement', 'Financial modelling and term sheet review', 'Due diligence coordination'].map(item => (
                        <li key={item} style={{ paddingLeft: '18px', position: 'relative', marginBottom: '4px' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)', fontWeight: 700 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
              <div className="col-md-6">
                <Reveal delay={4}>
                  <div style={{
                    background: 'var(--color-ivory-muted)',
                    borderLeft: '3px solid rgba(15,43,60,0.15)',
                    padding: '1.5rem',
                  }}>
                    <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
                      What We Are Not
                    </p>
                    <ul className="list-unstyled mb-0" style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                      {['A licensed bank or deposit-taking institution', 'A fund manager or asset manager', 'A retail financial services provider', 'A legal or accounting firm'].map(item => (
                        <li key={item} style={{ paddingLeft: '18px', position: 'relative', marginBottom: '4px' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--color-muted)' }}>—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
