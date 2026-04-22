export default function SectionIntro({ label, title, body, centered = false, light = false }) {
  const textAlign = centered ? 'text-center' : ''
  const labelCls = light ? 'section-label section-label-light' : 'section-label'
  const accentCls = centered ? 'accent-line-center' : 'accent-line'
  const titleColor = light ? 'text-white' : ''
  const bodyColor = light ? 'text-white-90' : 'text-muted-custom'

  return (
    <div className={`section-intro mb-4 ${textAlign}`}>
      {label && <span className={labelCls}>{label}</span>}
      <h2 className={`heading-serif ${accentCls} ${titleColor}`} style={{ fontSize: 'var(--fs-h2)' }}>
        {title}
      </h2>
      {body && <p className={`mt-3 ${bodyColor}`} style={{ fontSize: 'var(--fs-lead)', maxWidth: centered ? '680px' : 'none', margin: centered ? '1rem auto 0' : undefined }}>{body}</p>}
    </div>
  )
}
