import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBooking, updateBooking } from '../services/BookingsAPI'
import { calcTotal } from '../utilities/calcPrice'
import { validateBooking } from '../utilities/validation'
import '../styles/EditBooking.css'

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

export default function EditBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getBooking(id).then(setForm)
  }, [id])

  if (!form) return <p style={{ padding: '2rem' }}>Loading...</p>

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const total = calcTotal(form)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateBooking(form)
    if (err) { setError(err); return }
    setError(null)
    await updateBooking(id, { ...form, total_price: total })
    navigate(`/bookings/${id}`)
  }

  const OptionGroup = ({ label, field }) => (
    <div className="form-group">
      <label>{label}</label>
      <div className="options-grid">
        {OPTIONS[field].map(opt => (
          <div
            key={opt}
            className={`option-card ${form[field] === opt ? 'selected' : ''}`}
            onClick={() => set(field, opt)}
          >
            <span className="option-icon">{ICONS[opt] || '•'}</span>
            {opt}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="edit-page">
      <button className="btn-back" onClick={() => navigate(`/bookings/${id}`)}>
        ← Back to detail
      </button>

      <h2>Edit Booking</h2>

      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            value={form.customer_name}
            onChange={e => set('customer_name', e.target.value)}
          />
        </div>

        <OptionGroup label="Haircut Style"     field="haircut_style" />
        <OptionGroup label="Beard Service"      field="beard_service" />
        <OptionGroup label="Scalp Treatment"    field="scalp_treatment" />
        <OptionGroup label="Stylist Preference" field="stylist" />

        <div className="edit-price-preview">Total: ${total}.00</div>

        {error && <div className="error-msg">{error}</div>}

        <div className="edit-actions">
          <button type="submit" className="btn-save">Save Changes</button>
          <button type="button" className="btn-cancel" onClick={() => navigate(`/bookings/${id}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}