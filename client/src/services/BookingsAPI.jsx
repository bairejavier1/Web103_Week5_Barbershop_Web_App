const BASE = 'http://localhost:3000/api/bookings'

export const getAllBookings = async () => (await fetch(BASE)).json()
export const getBooking     = async (id) => (await fetch(`${BASE}/${id}`)).json()

export const createBooking = async (data) =>
  (await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })).json()

export const updateBooking = async (id, data) =>
  (await fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })).json()

export const deleteBooking = async (id) =>
  (await fetch(`${BASE}/${id}`, { method: 'DELETE' })).json()