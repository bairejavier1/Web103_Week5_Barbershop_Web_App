import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllBookings, deleteBooking } from '../services/BookingsAPI'
import '../styles/BookingsList.css'

export default function BookingsList() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllBookings().then(data => { setBookings(data); setLoading(false) })
  }, [])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (!window.confirm('Delete this booking?')) return
    await deleteBooking(id)
    setBookings(prev => prev.filter(b => b.id !== id))
  }

  if (loading) return <p style={{ color: 'var(--muted)', padding: '2rem' }}>Loading bookings...</p>

  return (
    <div className="list-page">
      <div className="list-header">
        <div>
          <h2>My Bookings</h2>
          <p>{bookings.length} booking{bookings.length !== 1 ? 's' : ''} on record</p>
        </div>
        <button className="btn-new" onClick={() => navigate('/')}>+ New Booking</button>
      </div>

      <div className="bookings-grid">
        {bookings.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">💈</span>
            <h3>No bookings yet</h3>
            <p>Create your first barbershop booking to get started</p>
          </div>
        ) : (
          bookings.map(b => (
            <div className="booking-card" key={b.id} onClick={() => navigate(`/bookings/${b.id}`)}>
              <div className="card-top">
                <h3>{b.customer_name}</h3>
                <span className="badge">{b.haircut_style}</span>
              </div>
              <div className="card-details">
                {b.beard_service   !== 'none' && <div>Beard: <span>{b.beard_service}</span></div>}
                {b.scalp_treatment !== 'none' && <div>Scalp: <span>{b.scalp_treatment}</span></div>}
                <div>Stylist: <span>{b.stylist}</span></div>
              </div>
              <div className="card-price">${Number(b.total_price).toFixed(2)}</div>
              <div className="card-actions" onClick={e => e.stopPropagation()}>
                <button className="btn-view"   onClick={() => navigate(`/bookings/${b.id}`)}>View Details</button>
                <button className="btn-delete" onClick={e => handleDelete(e, b.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}