import { neon } from '@neondatabase/serverless'
import dotenv from 'dotenv'

dotenv.config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env

// create a sql connection to neon
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

// # psql 'postgresql://neondb_owner:npg_6Ewun8SpTbIm@ep-soft-moon-a997iqnb-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
