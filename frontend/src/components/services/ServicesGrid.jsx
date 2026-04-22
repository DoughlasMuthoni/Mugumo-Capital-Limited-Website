import { services } from '../../data/services'

export default function ServicesGrid() {
  return (
    <nav
      aria-label="Services quick navigation"
      style={{
        background: 'var(--color-ivory)',
        borderBottom: '1px solid var(--color-ivory-muted)',
        position: 'sticky',
        top: '72px',
        zIndex: 100,
        padding: '0.75rem 0',
      }}
    >
      <div className="container">
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {services.map(({ id, icon, title }) => (
            <a
              key={id}
              href={`#${id}`}
              className="d-inline-flex align-items-center gap-2"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--color-navy)',
                background: 'var(--color-white)',
                border: '1px solid var(--color-ivory-muted)',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-accent)'
                e.currentTarget.style.color = 'white'
                e.currentTarget.style.borderColor = 'var(--color-accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-white)'
                e.currentTarget.style.color = 'var(--color-navy)'
                e.currentTarget.style.borderColor = 'var(--color-ivory-muted)'
              }}
            >
              <i className={`bi ${icon}`}></i>
              <span className="d-none d-md-inline">{title.split(' ').slice(0, 3).join(' ')}</span>
              <span className="d-md-none">{title.split(' ')[title.split(' ').length - 1]}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
