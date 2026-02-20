import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { migrateDatabase } from './src/config/migrateDatabase.js'

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from backend/.env
dotenv.config({ path: join(__dirname, '.env') })

async function runMigration() {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'Not found')
    await migrateDatabase()
    console.log('Migration completed!')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
