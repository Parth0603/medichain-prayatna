import app from './app.js'
import dotenv from 'dotenv'
import { log } from './utils/logger.js'

dotenv.config()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`)
  log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
