import Reveal from '../common/Reveal'
import SectionIntro from '../common/SectionIntro'
import { useLang } from '../../context/LanguageContext'

import imgHousing from '../../assets/images/sector-housing.jpg'
import imgSolar from '../../assets/images/sector-solar.jpg'
import imgWind from '../../assets/images/sector-wind.jpg'
import imgGeothermal from '../../assets/images/sector-geothermal.jpg'
import imgPPP from '../../assets/images/sector-ppp.jpg'
import imgMicrofinance from '../../assets/images/sector-microfinance.jpg'

const sectorImages = [imgHousing, imgSolar, imgWind, imgGeothermal, imgPPP, imgMicrofinance]
const sectorAlts = [
  'Affordable housing development',
  'Solar energy panels',
  'Wind turbines',
  'Geothermal energy plant',
  'Infrastructure and roads',
  'Microfinance and financial inclusion',
]

export default function SectorsGrid() {
  const { t } = useLang()
  const s = t.sectors

  return (
    <section className="bg-navy section-py" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '500px', height: '500px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(232,117,26,0.14), transparent 70%)',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '400px', height: '400px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(232,117,26,0.08), transparent 70%)',
      }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionIntro
            label={s.label}
            title={s.heading}
            body={s.body}
            centered
            light
          />
        </Reveal>

        <div className="row g-4 mt-3">
          {s.items.map(({ tag, title, desc }, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <Reveal delay={idx + 1}>
                <div className="sector-card-wrap">
                  <img src={sectorImages[idx]} alt={sectorAlts[idx]} loading="lazy" className="sector-card-img" />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(8,25,35,0.95) 0%, rgba(8,25,35,0.45) 45%, rgba(8,25,35,0.15) 100%)',
                    zIndex: 1,
                  }} className="sector-overlay" />
                  <div style={{
                    position: 'absolute', top: '20px', left: '20px',
                    fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'var(--color-accent-soft)',
                    background: 'rgba(8,25,35,0.65)', backdropFilter: 'blur(8px)',
                    padding: '5px 14px', zIndex: 2,
                    border: '1px solid rgba(232,117,26,0.3)',
                  }}>
                    {tag}
                  </div>
                  <div className="sector-accent-line" style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: '3px', width: '0',
                    background: 'var(--color-accent)', zIndex: 3,
                    transition: 'width 0.4s ease',
                  }} aria-hidden="true" />
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: '28px', zIndex: 2,
                  }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.2rem', marginBottom: '8px', lineHeight: 1.2 }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, margin: 0 }} className="sector-desc">
                      {desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sector-card-wrap { position: relative; aspect-ratio: 4/5; overflow: hidden; background: var(--color-deep-navy); cursor: default; }
        .sector-card-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.72; transition: opacity 0.5s ease, transform 0.6s ease; }
        .sector-card-wrap:hover .sector-card-img { opacity: 0.85; transform: scale(1.06); }
        .sector-card-wrap:hover .sector-accent-line { width: 100% !important; }
      `}</style>
    </section>
  )
}
