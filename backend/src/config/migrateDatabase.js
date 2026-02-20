import pool from './database.js'

export async function migrateDatabase() {
  try {
    console.log('🔄 Starting database migration...')

    // Add new columns to shipments table
    await pool.query(`
      ALTER TABLE shipments 
      ADD COLUMN IF NOT EXISTS from_type VARCHAR(50),
      ADD COLUMN IF NOT EXISTS from_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS from_address TEXT,
      ADD COLUMN IF NOT EXISTS from_contact VARCHAR(100),
      ADD COLUMN IF NOT EXISTS to_type VARCHAR(50),
      ADD COLUMN IF NOT EXISTS to_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS to_address TEXT,
      ADD COLUMN IF NOT EXISTS to_contact VARCHAR(100);
    `)

    console.log('✅ Database migration completed successfully')
  } catch (error) {
    console.error('❌ Error migrating database:', error)
    throw error
  }
}
