import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Resolve the .env path relative to this file, not the working directory
const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

console.log('🔍 Connecting to:', process.env.PGHOST) // debug line

import { pool } from './database.js'

async function reset() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS bookings;

      CREATE TABLE bookings (
        id                SERIAL PRIMARY KEY,
        customer_name     VARCHAR(100) NOT NULL,
        haircut_style     VARCHAR(50)  NOT NULL,
        beard_service     VARCHAR(50)  NOT NULL DEFAULT 'none',
        scalp_treatment   VARCHAR(50)  NOT NULL DEFAULT 'none',
        stylist           VARCHAR(50)  NOT NULL DEFAULT 'any',
        total_price       NUMERIC(6,2) NOT NULL
      );

      INSERT INTO bookings (customer_name, haircut_style, beard_service, scalp_treatment, stylist, total_price)
      VALUES
        ('Marcus J.',  'fade',   'trim',    'shampoo',   'Jordan', 55.00),
        ('Leo R.',     'taper',  'none',    'none',      'Marcus', 30.00),
        ('Derek S.',   'buzz',   'none',    'none',      'any',    20.00);
    `)
    console.log('✅ Table created and seeded!')
  } catch (err) {
    console.error('❌ Reset failed:', err.message)
  } finally {
    await pool.end()
  }
}

reset()