import Reveal from '../common/Reveal'
import { useLang } from '../../context/LanguageContext'
import { useSiteData } from '../../context/SiteDataContext'

export default function ContactInfo() {
  const { t } = useLang()
  const c = t.contact_info
  const { settings } = useSiteData()

  const email   = settings.contact_email   || 'info@mugumocapital.com'
  const address = settings.office_address  || 'Nairobi, Kenya'
  const phone   = settings.office_phone

  return (
    <div>
      <Reveal>
        <h2 className="heading-serif mb-4" style={{ fontSize: 'var(--fs-h3)' }}>
          {c.heading}
        </h2>
      </Reveal>

      <Reveal delay={1}>
        <p className="text-muted-custom mb-4" style={{ lineHeight: 1.8, fontSize: '0.975rem' }}>
          {c.body}
        </p>
      </Reveal>

      <Reveal delay={2}>
        <div className="mb-4">
          <div className="d-flex align-items-start gap-3 mb-3">
            <div className="icon-circle" style={{ flexShrink: 0 }}>
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <div>
              <p className="mb-0" style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{c.location_label}</p>
              <p className="mb-0 text-muted-custom" style={{ fontSize: '0.9rem' }}>{address}</p>
            </div>
          </div>
          <div className="d-flex align-items-start gap-3">
            <div className="icon-circle" style={{ flexShrink: 0 }}>
              <i className="bi bi-envelope-at-fill"></i>
            </div>
            <div>
              <p className="mb-0" style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{c.email_label}</p>
              <a href={`mailto:${email}`} className="text-muted-custom" style={{ fontSize: '0.9rem' }}>
                {email}
              </a>
            </div>
          </div>
          {phone && (
            <div className="d-flex align-items-start gap-3 mt-3">
              <div className="icon-circle" style={{ flexShrink: 0 }}>
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div>
                <p className="mb-0" style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{c.phone_label || 'Phone'}</p>
                <a href={`tel:${phone}`} className="text-muted-custom" style={{ fontSize: '0.9rem' }}>
                  {phone}
                </a>
              </div>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={3}>
        <div className="row g-3 mt-2">
          <div className="col-6">
            <div style={{
              background: 'var(--color-navy)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              height: '100%',
            }}>
              <i className="bi bi-rocket-takeoff-fill d-block mb-2" style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}></i>
              <p className="text-white mb-1" style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.sponsor_title}</p>
              <p style={{ color: 'rgba(247,243,236,0.65)', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
                {c.sponsor_body}
              </p>
            </div>
          </div>
          <div className="col-6">
            <div style={{
              background: 'var(--color-accent)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              height: '100%',
            }}>
              <i className="bi bi-safe2-fill d-block mb-2" style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.9)' }}></i>
              <p className="text-white mb-1" style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.investor_title}</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
                {c.investor_body}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={4}>
        <div className="mt-4 p-3" style={{
          background: 'var(--color-ivory)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '3px solid var(--color-accent)',
        }}>
          <p className="mb-0" style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--color-navy)' }}>{c.commitment}</strong> {c.commitment_body}
          </p>
        </div>
      </Reveal>
    </div>
  )
}
