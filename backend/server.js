import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

import productRoutes from './routes/poductRoutes.js'
import { sql } from './config/db.js'
import { aj } from './lib/arcjet.js'

dotenv.config()
const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: false, // avoid static file issues
  })
)
app.use(morgan('dev'))

// Arcjet rate-limit middleware for all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 })

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: 'Too Many Requests' })
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'Bot Access Denied' })
      } else {
        return res.status(403).json({ error: 'Forbidden' })
      }
    }

    // check for spoofed bots
    if (
      decision.results?.some(
        (r) => r.reason?.isBot?.() && r.reason?.isSpoofed?.()
      )
    ) {
      return res.status(403).json({ error: 'Spoofed bot detected' })
    }

    next()
  } catch (error) {
    console.error('Arcjet error:', error)
    next() // don't freeze the request
  }
})

// API routes
app.use('/api/products', productRoutes)

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')))

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

// Initialize DB
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing DB:', error)
  }
}

// Start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
  })
})
