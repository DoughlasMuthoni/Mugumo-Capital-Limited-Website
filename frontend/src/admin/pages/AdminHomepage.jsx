import { useEffect, useState } from 'react'
import { adminApi } from '../api/adminApi'

// Keys for plain text fields
const SIMPLE_KEYS = [
  'about_label', 'about_heading', 'about_p1', 'about_p2',
  'about_cta', 'about_hq', 'about_nairobi',
  'why_label', 'why_heading', 'why_body',
]

const SIMPLE_DEFAULTS = {
  about_label:   'Who We Are',
  about_heading: 'A Kenyan Capital Raising Partner Built for East Africa',
  about_p1:      'Mugumo Capital Partners is a Nairobi-headquartered advisory firm dedicated to arranging and syndicating project finance, structured debt, and institutional capital across Kenya and East Africa.',
  about_p2:      'We operate at the intersection of bankable project development and institutional investor requirements — providing the structuring discipline, sector expertise, and regional network that transformational projects demand.',
  about_cta:     'Learn More About Us',
  about_hq:      'Headquartered in',
  about_nairobi: 'Nairobi, Kenya',
  why_label:     'Why Partner With Mugumo',
  why_heading:   'Deep East African Roots. Institutional-Grade Execution.',
  why_body:      'Four pillars that define how we work, what we offer, and why sponsors and investors choose to work with us.',
}

const DEFAULT_PILLARS = ['Project Finance', 'PPP Advisory', 'Institutional Capital']

const DEFAULT_WHY_ITEMS = [
  { icon: 'bi-pin-map-fill',   title: 'Local Conviction',      body: 'Headquartered in Nairobi with regional coverage across East Africa, we bring on-the-ground sector knowledge and investor relationships that matter.' },
  { icon: 'bi-diagram-3-fill', title: 'Investor Network',      body: 'We maintain active relationships with institutional investors, DFIs, pension funds, and commercial banks aligned with our focus sectors.' },
  { icon: 'bi-layers-fill',    title: 'Structuring Discipline', body: 'We bring rigorous financial structuring experience to every mandate — from feasibility to financial close.' },
  { icon: 'bi-trophy-fill',    title: 'Sector Specialisation',  body: 'Our focus is intentional: affordable housing, renewable energy, PPP infrastructure, and microfinance. We do not dilute our expertise.' },
]

const ICON_PRESETS = [
  'bi-pin-map-fill', 'bi-diagram-3-fill', 'bi-layers-fill', 'bi-trophy-fill',
  'bi-shield-check-fill', 'bi-briefcase-fill', 'bi-bar-chart-fill', 'bi-globe',
  'bi-building-fill', 'bi-people-fill', 'bi-bank', 'bi-stars',
  'bi-graph-up-arrow', 'bi-lightning-charge-fill', 'bi-check-circle-fill', 'bi-hand-thumbs-up-fill',
]

// ── Shared style atoms ────────────────────────────────────────────────────────

const inputBase = {
  width: '100%', padding: '9px 12px',
  border: '1.5px solid #E5E7EB', borderRadius: '7px',
  fontSize: '0.865rem', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
  background: '#fff', transition: 'border-color 0.15s, box-shadow 0.15s',
}
const lbl = {
  display: 'block', fontSize: '0.72rem', fontWeight: 600,
  color: '#374151', marginBottom: '6px', letterSpacing: '0.03em',
}
const fi = e => { e.target.style.borderColor = '#0F2B3C'; e.target.style.boxShadow = '0 0 0 3px rgba(15,43,60,0.07)' }
const fo = e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({ label, keyName, type = 'text', values, setValues, hint, rows = 3 }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={lbl}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={values[keyName] ?? ''}
          onChange={e => setValues(v => ({ ...v, [keyName]: e.target.value }))}
          rows={rows}
          style={{ ...inputBase, resize: 'vertical', lineHeight: 1.65 }}
          onFocus={fi} onBlur={fo}
        />
      ) : (
        <input
          type="text"
          value={values[keyName] ?? ''}
          onChange={e => setValues(v => ({ ...v, [keyName]: e.target.value }))}
          style={inputBase}
          onFocus={fi} onBlur={fo}
        />
      )}
      {hint && <p style={{ fontSize: '0.7rem', color: '#9CA3AF', margin: '4px 0 0', lineHeight: 1.4 }}>{hint}</p>}
    </div>
  )
}

function IconPicker({ value, onChange }) {
  return (
    <div>
      <label style={lbl}>Icon</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{
          width: '36px', height: '36px', flexShrink: 0, borderRadius: '7px',
          background: '#0F2B3C',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <i className={`bi ${value || 'bi-question-circle'}`} style={{ fontSize: '1.1rem', color: '#E8751A' }} />
        </div>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="bi-icon-name"
          style={{ ...inputBase, flex: 1 }}
          onFocus={fi} onBlur={fo}
        />
      </div>
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        {ICON_PRESETS.map(ic => (
          <button
            key={ic}
            type="button"
            onClick={() => onChange(ic)}
            title={ic}
            style={{
              width: '30px', height: '30px', borderRadius: '5px', cursor: 'pointer',
              border: value === ic ? '1.5px solid #0F2B3C' : '1px solid #E5E7EB',
              background: value === ic ? '#EEF2FF' : '#F9FAFB',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.1s',
            }}
            onMouseEnter={e => { if (value !== ic) { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.borderColor = '#D1D5DB' } }}
            onMouseLeave={e => { if (value !== ic) { e.currentTarget.style.background = '#F9FAFB'; e.currentTarget.style.borderColor = '#E5E7EB' } }}
          >
            <i className={`bi ${ic}`} style={{ fontSize: '0.85rem', color: value === ic ? '#0F2B3C' : '#6B7280' }} />
          </button>
        ))}
      </div>
    </div>
  )
}

function SectionCard({ title, description, accent = '#E8751A', children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '10px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)',
      overflow: 'hidden', marginBottom: '24px', border: '1px solid #F3F4F6',
    }}>
      <div style={{ padding: '15px 24px', borderBottom: '1px solid #F3F4F6', borderLeft: `3px solid ${accent}` }}>
        <h2 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0F2B3C', margin: 0 }}>{title}</h2>
        {description && <p style={{ fontSize: '0.765rem', color: '#6B7280', margin: '3px 0 0' }}>{description}</p>}
      </div>
      <div style={{ padding: '22px 24px' }}>{children}</div>
    </div>
  )
}

function SubHead({ children }) {
  return (
    <div style={{
      fontSize: '0.68rem', fontWeight: 700, color: '#6B7280',
      textTransform: 'uppercase', letterSpacing: '0.1em',
      paddingTop: '18px', marginTop: '4px', marginBottom: '14px',
      borderTop: '1px solid #F3F4F6',
    }}>
      {children}
    </div>
  )
}

function CtrlBtn({ title, icon, onClick, disabled = false, danger = false }) {
  const base = {
    width: '28px', height: '28px', borderRadius: '5px', cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.1s', flexShrink: 0, border: '1px solid',
  }
  const style = disabled
    ? { ...base, background: '#F9FAFB', borderColor: '#F3F4F6', color: '#D1D5DB' }
    : danger
    ? { ...base, background: 'rgba(220,38,38,0.06)', borderColor: 'rgba(220,38,38,0.18)', color: '#EF4444' }
    : { ...base, background: '#F3F4F6', borderColor: '#E5E7EB', color: '#6B7280' }

  return (
    <button type="button" title={title} disabled={disabled} onClick={onClick} style={style}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.background = danger ? 'rgba(220,38,38,0.14)' : '#E9EAEC'
          e.currentTarget.style.color = danger ? '#DC2626' : '#374151'
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          e.currentTarget.style.background = danger ? 'rgba(220,38,38,0.06)' : '#F3F4F6'
          e.currentTarget.style.color = danger ? '#EF4444' : '#6B7280'
        }
      }}
    >
      <i className={`bi ${icon}`} style={{ fontSize: '0.78rem' }} />
    </button>
  )
}

function AddButton({ onClick, label, accentNav = false }) {
  return (
    <button type="button" onClick={onClick}
      style={{
        marginTop: '10px',
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '7px 16px', borderRadius: '7px',
        background: 'transparent',
        border: '1.5px dashed #D1D5DB',
        color: '#6B7280', fontSize: '0.8rem', fontWeight: 500,
        cursor: 'pointer', transition: 'all 0.15s',
      }}
      onMouseEnter={e => {
        const c = accentNav ? '#0F2B3C' : '#E8751A'
        e.currentTarget.style.borderColor = c
        e.currentTarget.style.color = c
        e.currentTarget.style.background = accentNav ? 'rgba(15,43,60,0.04)' : 'rgba(232,117,26,0.04)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#D1D5DB'
        e.currentTarget.style.color = '#6B7280'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <i className="bi bi-plus-lg" style={{ fontSize: '0.8rem' }} /> {label}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminHomepage() {
  const [values,   setValues]   = useState({ ...SIMPLE_DEFAULTS })
  const [pillars,  setPillars]  = useState([...DEFAULT_PILLARS])
  const [whyItems, setWhyItems] = useState([...DEFAULT_WHY_ITEMS])
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [error,    setError]    = useState('')

  useEffect(() => {
    adminApi.getSettings()
      .then(d => {
        const s = d.settings || {}

        // Simple text fields
        const merged = { ...SIMPLE_DEFAULTS }
        SIMPLE_KEYS.forEach(k => { if (s[k]?.value) merged[k] = s[k].value })
        setValues(merged)

        // Pillars — prefer JSON key, then individual keys, then defaults
        let loadedPillars = null
        if (s.about_pillars?.value) {
          try {
            const p = JSON.parse(s.about_pillars.value)
            if (Array.isArray(p) && p.length) loadedPillars = p
          } catch (_) {}
        }
        if (!loadedPillars) {
          const fromKeys = [1, 2, 3]
            .map(n => s[`about_pillar_${n}`]?.value || '')
            .filter(Boolean)
          if (fromKeys.length) loadedPillars = fromKeys
        }
        if (loadedPillars) setPillars(loadedPillars)

        // Why items — prefer JSON key, then individual keys, then defaults
        let loadedItems = null
        if (s.why_items?.value) {
          try {
            const p = JSON.parse(s.why_items.value)
            if (Array.isArray(p) && p.length) loadedItems = p
          } catch (_) {}
        }
        if (!loadedItems) {
          loadedItems = DEFAULT_WHY_ITEMS.map((def, i) => ({
            icon:  def.icon,
            title: s[`why_item_${i + 1}_title`]?.value || def.title,
            body:  s[`why_item_${i + 1}_body`]?.value  || def.body,
          }))
        }
        setWhyItems(loadedItems)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // ── Pillar helpers ────────────────────────────────────────────────────────
  const addPillar    = ()          => setPillars(p => [...p, ''])
  const removePillar = i           => setPillars(p => p.filter((_, idx) => idx !== i))
  const setPillar    = (i, v)      => setPillars(p => p.map((x, idx) => idx === i ? v : x))
  const movePillar   = (i, dir)    => setPillars(p => { const a = [...p]; [a[i], a[i + dir]] = [a[i + dir], a[i]]; return a })

  // ── Why-item helpers ──────────────────────────────────────────────────────
  const addWhyItem    = ()             => setWhyItems(it => [...it, { icon: 'bi-briefcase-fill', title: '', body: '' }])
  const removeWhyItem = i              => setWhyItems(it => it.filter((_, idx) => idx !== i))
  const setWhyField   = (i, field, v) => setWhyItems(it => it.map((x, idx) => idx === i ? { ...x, [field]: v } : x))
  const moveWhyItem   = (i, dir)       => setWhyItems(it => { const a = [...it]; [a[i], a[i + dir]] = [a[i + dir], a[i]]; return a })

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaved(false)
    setSaving(true)
    try {
      await adminApi.updateSettings({
        ...values,
        about_pillars: JSON.stringify(pillars.filter(p => p.trim())),
        why_items:     JSON.stringify(whyItems.filter(it => it.title.trim() || it.body.trim())),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3500)
    } catch (err) {
      setError(err.message || 'Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9CA3AF', padding: '40px 0' }}>
      <span style={{ width: '15px', height: '15px', border: '2px solid #E5E7EB', borderTopColor: '#0F2B3C', borderRadius: '50%', display: 'inline-block', animation: 'hpSpin 0.7s linear infinite' }} />
      Loading content…
      <style>{`@keyframes hpSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2B3C', marginBottom: '4px', letterSpacing: '-0.02em' }}>
          Homepage Content
        </h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
          Edit the "Who We Are" and "Why Partner With Mugumo" sections on the homepage.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ maxWidth: '820px' }}>

        {/* ── Who We Are ───────────────────────────────────────────────────── */}
        <SectionCard
          title='Section — "Who We Are"'
          description="The two-column intro section below the homepage hero."
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <Field keyName="about_label"   label="Section Label"    values={values} setValues={setValues} hint='"Who We Are"' />
            <Field keyName="about_cta"     label="CTA Button Text"  values={values} setValues={setValues} hint='"Learn More About Us"' />
          </div>
          <Field keyName="about_heading"   label="Heading"          values={values} setValues={setValues} />
          <Field keyName="about_p1"        label="First Paragraph"  type="textarea" values={values} setValues={setValues} />
          <Field keyName="about_p2"        label="Second Paragraph" type="textarea" values={values} setValues={setValues} />

          <SubHead>Photo Badge</SubHead>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <Field keyName="about_hq"      label="Badge Label"  values={values} setValues={setValues} hint='"Headquartered in"' />
            <Field keyName="about_nairobi" label="Badge City"   values={values} setValues={setValues} hint='"Nairobi, Kenya"' />
          </div>

          {/* ── Pillars (dynamic) ── */}
          <SubHead>Pillars — {pillars.length} item{pillars.length !== 1 ? 's' : ''}</SubHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pillars.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                  background: '#0F2B3C', color: '#E8751A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.63rem', fontWeight: 700,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <input
                  type="text"
                  value={p}
                  onChange={e => setPillar(i, e.target.value)}
                  placeholder={`Pillar ${i + 1} label`}
                  style={{ ...inputBase, flex: 1 }}
                  onFocus={fi} onBlur={fo}
                />
                <CtrlBtn title="Move up"   icon="bi-arrow-up"   onClick={() => movePillar(i, -1)} disabled={i === 0} />
                <CtrlBtn title="Move down" icon="bi-arrow-down" onClick={() => movePillar(i,  1)} disabled={i === pillars.length - 1} />
                <CtrlBtn title="Remove"    icon="bi-trash3"     onClick={() => removePillar(i)}   disabled={pillars.length <= 1} danger />
              </div>
            ))}
          </div>
          <AddButton onClick={addPillar} label="Add Pillar" />
        </SectionCard>

        {/* ── Why Partner With Mugumo ──────────────────────────────────────── */}
        <SectionCard
          title='Section — "Why Partner With Mugumo"'
          description="The card grid on the homepage. Add, remove, or reorder cards freely."
          accent="#0F2B3C"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <Field keyName="why_label"   label="Section Label"    values={values} setValues={setValues} />
            <div />
          </div>
          <Field keyName="why_heading" label="Heading"          values={values} setValues={setValues} />
          <Field keyName="why_body"    label="Body Paragraph"   type="textarea" values={values} setValues={setValues} rows={2} />

          <SubHead>Cards — {whyItems.length} item{whyItems.length !== 1 ? 's' : ''}</SubHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {whyItems.map((item, i) => (
              <div key={i} style={{
                padding: '16px 18px', background: '#FAFBFC',
                borderRadius: '9px', border: '1px solid #ECEEF1',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.67rem', fontWeight: 700, color: '#E8751A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Card {i + 1}
                  </span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <CtrlBtn title="Move up"   icon="bi-arrow-up"   onClick={() => moveWhyItem(i, -1)} disabled={i === 0} />
                    <CtrlBtn title="Move down" icon="bi-arrow-down" onClick={() => moveWhyItem(i,  1)} disabled={i === whyItems.length - 1} />
                    <CtrlBtn title="Remove"    icon="bi-trash3"     onClick={() => removeWhyItem(i)}   disabled={whyItems.length <= 1} danger />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '0 18px', alignItems: 'start' }}>
                  <IconPicker value={item.icon} onChange={v => setWhyField(i, 'icon', v)} />
                  <div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={lbl}>Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={e => setWhyField(i, 'title', e.target.value)}
                        placeholder="Card title"
                        style={inputBase}
                        onFocus={fi} onBlur={fo}
                      />
                    </div>
                    <div>
                      <label style={lbl}>Description</label>
                      <textarea
                        value={item.body}
                        onChange={e => setWhyField(i, 'body', e.target.value)}
                        rows={3}
                        placeholder="Card description"
                        style={{ ...inputBase, resize: 'vertical', lineHeight: 1.6 }}
                        onFocus={fi} onBlur={fo}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <AddButton onClick={addWhyItem} label="Add Card" accentNav />
        </SectionCard>

        {/* ── Feedback + Save ───────────────────────────────────────────────── */}
        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626',
            padding: '10px 16px', borderRadius: '7px', fontSize: '0.85rem',
            marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <i className="bi bi-exclamation-circle-fill" /> {error}
          </div>
        )}
        {saved && (
          <div style={{
            background: '#D1FAE5', border: '1px solid #A7F3D0', color: '#065F46',
            padding: '10px 16px', borderRadius: '7px', fontSize: '0.85rem',
            marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <i className="bi bi-check-circle-fill" /> Homepage content saved successfully.
          </div>
        )}

        <button type="submit" disabled={saving}
          style={{
            background: saving ? '#7A9EAF' : '#0F2B3C',
            color: '#fff', border: 'none', padding: '11px 28px',
            borderRadius: '7px', cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            boxShadow: saving ? 'none' : '0 2px 8px rgba(15,43,60,0.25)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { if (!saving) e.currentTarget.style.opacity = '0.88' }}
          onMouseLeave={e => { if (!saving) e.currentTarget.style.opacity = '1' }}
        >
          <i className="bi bi-floppy-fill" />
          {saving ? 'Saving…' : 'Save Homepage Content'}
        </button>
      </form>
    </>
  )
}
