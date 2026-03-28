import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import CreateBooking from './pages/CreateBooking'
import BookingsList  from './pages/BookingsList'
import BookingDetail from './pages/BookingDetail'
import EditBooking   from './pages/EditBooking'
import './styles/index.css'
import './styles/App.css'
import './styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">💈</span>
        <div>
          <span className="brand-text">FreshCuts</span>
          <span className="brand-sub">Premium Barbershop</span>
        </div>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/">New Booking</NavLink></li>
        <li><NavLink to="/bookings">My Bookings</NavLink></li>
      </ul>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/"                  element={<CreateBooking />} />
          <Route path="/bookings"          element={<BookingsList />} />
          <Route path="/bookings/:id"      element={<BookingDetail />} />
          <Route path="/bookings/:id/edit" element={<EditBooking />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}