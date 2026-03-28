import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import pg from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

const config = {
  user:     process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host:     process.env.PGHOST,
  port:     process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false }
}

export const pool = new pg.Pool(config)