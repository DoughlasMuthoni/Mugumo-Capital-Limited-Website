const config = {
  new:       { bg: '#FEF3C7', color: '#D97706', label: 'New' },
  read:      { bg: '#DBEAFE', color: '#2563EB', label: 'Read' },
  responded: { bg: '#D1FAE5', color: '#059669', label: 'Responded' },
}

export default function StatusBadge({ status }) {
  const c = config[status] || config.new
  return (
    <span style={{
      fontSize: '0.7rem',
      fontWeight: 700,
      background: c.bg,
      color: c.color,
      padding: '3px 10px',
      borderRadius: '20px',
      letterSpacing: '0.04em',
    }}>
      {c.label}
    </span>
  )
}
