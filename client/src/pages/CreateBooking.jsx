import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBooking } from '../services/BookingsAPI'
import { calcTotal, PRICES } from '../utilities/calcPrice'
import { validateBooking } from '../utilities/validation'
import '../styles/CreateBooking.css'

const OPTIONS = {
  haircut_style:   ['fade', 'taper', 'buzz', 'frohawk', 'caesar'],
  beard_service:   ['none', 'trim', 'shape', 'lineup'],
  scalp_treatment: ['none', 'shampoo', 'treatment'],
  stylist:         ['any', 'Marcus', 'Jordan', 'Casey']
}

const ICONS = {
  fade: '〰️', taper: '✂️', buzz: '⚡', frohawk: '🦅', caesar: '👑',
  none: '—',  trim: '🪒',  shape: '✏️', lineup: '📐',
  shampoo: '🚿', treatment: '💆',
  any: '🎲', Marcus: '💈', Jordan: '⭐', Casey: '🌟'
}

const LABELS = {
  haircut_style: 'Haircut Style',
  beard_service: 'Beard Service',
  scalp_treatment: 'Scalp Treatment',
  stylist: 'Stylist'
}

const getVisual = ({ haircut_style, beard_service, scalp_treatment }) =>
  [ICONS[haircut_style], beard_service !== 'none' ? ICONS[beard_service] : null,
   scalp_treatment !== 'none' ? ICONS[scalp_treatment] : null].filter(Boolean)

// Returns true if a specific option is incompatible with current selections
const isDisabled = (field, opt, form) => {
  if (field === 'beard_service'   && opt === 'shape'     && form.haircut_style === 'buzz') return true
  if (field === 'scalp_treatment' && opt === 'treatment' && form.haircut_style === 'buzz') return true
  return false
}

export default function CreateBooking() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    customer_name: '', haircut_style: '', beard_service: 'none',
    scalp_treatment: 'none', stylist: 'any'
  })
  const [error, setError]     = useState(null)
  const [loading, setLoading] = useState(false)

  const set     = (field, val) => setForm(p => ({ ...p, [field]: val }))
  const total   = calcTotal(form)
  const visuals = getVisual(form)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateBooking(form)
    if (err) { setError(err); return }
    setError(null)
    setLoading(true)
    await createBooking({ ...form, total_price: total })
    setLoading(false)
    navigate('/bookings')
  }

  const OptionGroup = ({ field }) => (
    <div className="form-group">
      <label>{LABELS[field]}</label>
      <div className="options-grid">
        {OPTIONS[field].map(opt => {
          const disabled = isDisabled(field, opt, form)
          return (
            <div
              key={opt}
              className={`option-card ${form[field] === opt ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
              onClick={() => !disabled && set(field, opt)}
              title={disabled ? 'Not compatible with your current selections' : ''}
            >
              <span className="option-icon">{ICONS[opt] || '•'}</span>
              {opt}
              {disabled && <span className="option-incompatible">✕</span>}
              {!disabled && PRICES[field][opt] > 0 && <span className="option-price">+${PRICES[field][opt]}</span>}
              {!disabled && PRICES[field][opt] === 0 && opt !== 'none' && <span className="option-price">free</span>}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="create-page">
      <div className="page-header">
        <h2>Build Your Booking</h2>
        <p>Customize your perfect barbershop experience</p>
      </div>

      <div className="create-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-section-title">Your Info</div>
            <label>Customer Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.customer_name}
              onChange={e => set('customer_name', e.target.value)}
            />
          </div>

          <div>
            <div className="form-section-title">Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <OptionGroup field="haircut_style" />
              <OptionGroup field="beard_service" />
              <OptionGroup field="scalp_treatment" />
            </div>
          </div>

          <div>
            <div className="form-section-title">Stylist</div>
            <OptionGroup field="stylist" />
          </div>

          {error && <div className="error-msg">⚠️ {error}</div>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Confirm Booking'}
          </button>
        </form>

        {/* Live preview — visual interface changes with selections */}
        <div className="booking-preview">
          <div className="preview-header">
            <h3>Your Summary</h3>
            <span className="preview-badge">Live Preview</span>
          </div>

          <div className="barber-visual">
            {visuals.length > 0
              ? visuals.map((v, i) => <span key={i}>{v}</span>)
              : <span className="placeholder-text">Select options to preview</span>
            }
          </div>

          <div className="preview-divider" />

          {[
            { label: 'Haircut',  field: 'haircut_style',   priceKey: 'haircut_style' },
            { label: 'Beard',    field: 'beard_service',   priceKey: 'beard_service' },
            { label: 'Scalp',    field: 'scalp_treatment', priceKey: 'scalp_treatment' },
            { label: 'Stylist',  field: 'stylist',         priceKey: 'stylist' },
          ].map(({ label, field, priceKey }) => (
            <div className="preview-item" key={field}>
              <span className="p-label">{label}</span>
              <span className="p-value">{form[field] || '—'}</span>
              {PRICES[priceKey][form[field]] > 0 &&
                <span className="p-price">+${PRICES[priceKey][form[field]]}</span>}
            </div>
          ))}

          <div className="preview-divider" />
          <div className="preview-total">
            <span>Total</span>
            <span>${total}.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}