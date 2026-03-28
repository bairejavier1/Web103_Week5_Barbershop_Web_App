import { pool } from '../config/database.js'

export const getAllBookings = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY id ASC')
    res.json(result.rows)
  } catch (err) {
    console.error('getAllBookings error:', err.message)
    res.status(500).json({ error: err.message })
  }
}

export const getBooking = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id])
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Booking not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createBooking = async (req, res) => {
  try {
    const { customer_name, haircut_style, beard_service, scalp_treatment, stylist, total_price } = req.body
    const result = await pool.query(
      `INSERT INTO bookings (customer_name, haircut_style, beard_service, scalp_treatment, stylist, total_price)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [customer_name, haircut_style, beard_service || 'none', scalp_treatment || 'none', stylist || 'any', total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params
    const { customer_name, haircut_style, beard_service, scalp_treatment, stylist, total_price } = req.body
    const result = await pool.query(
      `UPDATE bookings
       SET customer_name=$1, haircut_style=$2, beard_service=$3,
           scalp_treatment=$4, stylist=$5, total_price=$6
       WHERE id=$7 RETURNING *`,
      [customer_name, haircut_style, beard_service || 'none', scalp_treatment || 'none', stylist || 'any', total_price, id]
    )
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Booking not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM bookings WHERE id=$1 RETURNING *', [id])
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Booking not found' })
    res.json({ message: 'Booking deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}