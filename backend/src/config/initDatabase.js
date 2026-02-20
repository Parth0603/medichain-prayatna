import pool from './database.js'

export async function initDatabase() {
  try {
    // Create batches table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS batches (
        batch_id VARCHAR(255) PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        expiry_date BIGINT NOT NULL,
        storage_rules TEXT,
        current_owner VARCHAR(42) NOT NULL,
        is_flagged BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        tx_hash VARCHAR(66)
      )
    `)

    // Create shipments table with supply chain tracking
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shipments (
        id SERIAL PRIMARY KEY,
        batch_id VARCHAR(255) REFERENCES batches(batch_id),
        location VARCHAR(255) NOT NULL,
        temperature INTEGER NOT NULL,
        is_breach BOOLEAN DEFAULT FALSE,
        timestamp BIGINT NOT NULL,
        tx_hash VARCHAR(66),
        from_type VARCHAR(50),
        from_name VARCHAR(255),
        from_address TEXT,
        from_contact VARCHAR(100),
        to_type VARCHAR(50),
        to_name VARCHAR(255),
        to_address TEXT,
        to_contact VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create index for faster queries
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_batch_id ON shipments(batch_id)
    `)

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_created_at ON batches(created_at DESC)
    `)

    console.log('✅ Database tables initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  }
}
