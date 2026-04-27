export default function StatCard({ icon, label, value, sub, color = '#0F2B3C' }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
      border: '1px solid #F3F4F6',
    }}>
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${color} 0%, ${color}60 100%)` }} />
      <div style={{ padding: '22px 22px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 600, color: '#6B7280',
            letterSpacing: '0.07em', textTransform: 'uppercase',
            lineHeight: 1.45, maxWidth: '68%',
          }}>
            {label}
          </span>
          <div style={{
            width: '38px', height: '38px', borderRadius: '9px',
            background: color + '18',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <i className={`bi ${icon}`} style={{ fontSize: '1.1rem', color }} />
          </div>
        </div>
        <div style={{
          fontSize: '2.1rem', fontWeight: 800, color: '#0F2B3C',
          lineHeight: 1, fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
        }}>
          {value}
        </div>
        {sub && (
          <div style={{ fontSize: '0.73rem', color: '#9CA3AF', marginTop: '7px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color + '60', display: 'inline-block', flexShrink: 0 }} />
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}
