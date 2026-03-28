import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBooking, deleteBooking } from '../services/BookingsAPI'
import '../styles/BookingDetail.css'

const ROWS = [
  { label: 'Haircut Style',   icon: '✂️',  key: 'haircut_style' },
  { label: 'Beard Service',   icon: '🪒',  key: 'beard_service' },
  { label: 'Scalp Treatment', icon: '💆',  key: 'scalp_treatment' },
  { label: 'Stylist',         icon: '💈',  key: 'stylist' },
]

export default function BookingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)

  useEffect(() => { getBooking(id).then(setBooking) }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this booking?')) return
    await deleteBooking(id)
    navigate('/bookings')
  }

  if (!booking) return <p style={{ color: 'var(--muted)', padding: '2rem' }}>Loading...</p>

  return (
    <div className="detail-page">
      <button className="btn-back" onClick={() => navigate('/bookings')}>← Back to bookings</button>

      <div className="detail-card">
        <div className="detail-card-header">
          <h2>{booking.customer_name}</h2>
          <span className="header-badge">{booking.haircut_style}</span>
        </div>

        <div className="detail-body">
          {ROWS.map(({ label, icon, key }) => (
            <div className="detail-row" key={key}>
              <span className="label"><span className="row-icon">{icon}</span>{label}</span>
              <span className="value">{booking[key]}</span>
            </div>
          ))}
        </div>

        <div className="detail-total">
          <span>Total</span>
          <span>${Number(booking.total_price).toFixed(2)}</span>
        </div>

        <div className="detail-actions">
          <button className="btn-edit"   onClick={() => navigate(`/bookings/${id}/edit`)}>Edit Booking</button>
          <button className="btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}