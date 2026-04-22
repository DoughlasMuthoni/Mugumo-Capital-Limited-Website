export default function StatCard({ icon, label, value, sub, color = '#0F2B3C' }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
      borderLeft: `4px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {label}
        </span>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: color + '15',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <i className={`bi ${icon}`} style={{ fontSize: '1.1rem', color }} />
        </div>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: '0.78rem', color: '#9CA3AF', marginTop: '6px' }}>
          {sub}
        </div>
      )}
    </div>
  )
}
