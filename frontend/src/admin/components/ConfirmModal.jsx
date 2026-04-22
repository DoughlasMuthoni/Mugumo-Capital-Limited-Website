export default function ConfirmModal({ isOpen, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  if (!isOpen) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000, padding: '24px',
    }}
      onClick={onCancel}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '10px',
          padding: '32px', maxWidth: '420px', width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: '#FEE2E2', display: 'flex', alignItems: 'center',
          justifyContent: 'center', marginBottom: '16px',
        }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '1.3rem', color: '#DC2626' }} />
        </div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{title}</h3>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '24px' }}>{message}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{ padding: '8px 18px', border: '1px solid #D1D5DB', background: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{ padding: '8px 18px', border: 'none', background: '#DC2626', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
