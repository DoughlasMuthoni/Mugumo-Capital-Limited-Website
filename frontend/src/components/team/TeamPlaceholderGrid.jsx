import { useEffect, useState } from 'react'
import Reveal from '../common/Reveal'
import { getPublicTeam } from '../../services/api'
import { useLang } from '../../context/LanguageContext'
import { useSiteData } from '../../context/SiteDataContext'

const PLACEHOLDER_COUNT = 3

function MemberCard({ member, i }) {
  const { settings } = useSiteData()
  const email = settings.contact_email || 'info@mugumocapital.com'

  return (
    <div className="col-lg-4 col-md-6">
      <Reveal delay={i + 1}>
        <div className="mugumo-card text-center h-100">
          <div
            style={{
              width: '96px', height: '96px', borderRadius: '50%',
              overflow: 'hidden', margin: '0 auto 1.5rem',
              border: '3px solid var(--color-ivory-muted)',
              background: 'var(--color-ivory-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {member.photo_url ? (
              <img
                src={member.photo_url}
                alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <i className="bi bi-person" style={{ fontSize: '2.5rem', color: 'var(--color-muted)', opacity: 0.5 }} />
            )}
          </div>

          <p className="heading-serif mb-1" style={{ fontSize: '1.05rem', color: 'var(--color-navy)' }}>
            {member.name}
          </p>
          <p className="text-muted-custom mb-2" style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {member.role}
          </p>
          {member.bio && (
            <p className="text-muted-custom mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.65 }}>
              {member.bio}
            </p>
          )}
          <div className="d-flex justify-content-center gap-3 mt-auto">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-navy)', fontSize: '1.1rem' }}
                aria-label={`${member.name} on LinkedIn`}
              >
                <i className="bi bi-linkedin" />
              </a>
            )}
            <a
              href={`mailto:${email}`}
              style={{ color: 'var(--color-accent)', fontSize: '1.1rem' }}
              aria-label={`Email about ${member.name}`}
            >
              <i className="bi bi-envelope" />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function PlaceholderCard({ i }) {
  const { settings } = useSiteData()
  const email = settings.contact_email || 'info@mugumocapital.com'

  return (
    <div className="col-lg-4 col-md-6">
      <Reveal delay={i + 1}>
        <div className="mugumo-card text-center h-100">
          <div
            style={{
              width: '96px', height: '96px', borderRadius: '50%',
              background: 'var(--color-ivory-muted)',
              border: '3px solid var(--color-ivory-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
            aria-hidden="true"
          >
            <i className="bi bi-person" style={{ fontSize: '2.5rem', color: 'var(--color-muted)', opacity: 0.5 }} />
          </div>
          <p className="heading-serif mb-1" style={{ fontSize: '1rem', color: 'var(--color-navy)', fontStyle: 'italic' }}>
            Profile available on request
          </p>
          <p className="text-muted-custom mb-3" style={{ fontSize: '0.82rem' }}>Leadership Team</p>
          <a
            href={`mailto:${email}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--color-accent)', fontWeight: 600 }}
          >
            <i className="bi bi-envelope" />
            Request a Profile
          </a>
        </div>
      </Reveal>
    </div>
  )
}

export default function TeamPlaceholderGrid() {
  const { t } = useLang()
  const { settings } = useSiteData()
  const email = settings.contact_email || 'info@mugumocapital.com'

  const [members, setMembers]   = useState([])
  const [loaded, setLoaded]     = useState(false)

  useEffect(() => {
    getPublicTeam()
      .then(data => setMembers(Array.isArray(data) ? data : []))
      .catch(() => setMembers([]))
      .finally(() => setLoaded(true))
  }, [])

  const hasMembers = loaded && members.length > 0
  const showPlaceholders = !hasMembers

  return (
    <section className="bg-ivory section-py">
      <div className="container">
        <Reveal>
          <div className="text-center mb-5">
            <span className="section-label">Leadership Team</span>
            <h2 className="heading-serif accent-line-center" style={{ fontSize: 'var(--fs-h2)' }}>
              Our Team
            </h2>
            {showPlaceholders && (
              <p className="text-muted-custom mx-auto" style={{ maxWidth: '560px', fontSize: '0.95rem', lineHeight: 1.75 }}>
                Individual leadership profiles are available on request. We are happy to share details of our team's background and experience in the context of a specific mandate discussion.
              </p>
            )}
          </div>
        </Reveal>

        <div className="row g-4 justify-content-center">
          {hasMembers
            ? members.map((m, i) => <MemberCard key={m.id} member={m} i={i} />)
            : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
                <PlaceholderCard key={i} i={i} />
              ))
          }
        </div>

        <Reveal delay={4}>
          <div className="text-center mt-5">
            <a href={`mailto:${email}`} className="btn-mugumo-outline-navy" style={{ display: 'inline-block' }}>
              Request Team Information
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
