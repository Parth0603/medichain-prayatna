import express from 'express'
import cors from 'cors'
import batchRoutes from './routes/batchRoutes.js'
import shipmentRoutes from './routes/shipmentRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { initDatabase } from './config/initDatabase.js'

const app = express()

app.use(cors())
app.use(express.json())

// Initialize database tables
initDatabase().catch(console.error)

app.get('/', (req, res) => {
  res.json({ message: 'MediChain API Server' })
})

app.use('/api/batch', batchRoutes)
app.use('/api/shipment', shipmentRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/admin', adminRoutes)

app.use(errorHandler)

export default app
