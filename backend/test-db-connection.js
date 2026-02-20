import pg from 'pg'

const { Pool } = pg

const connectionString = 'postgresql://postgres.myemcksdcgufklbntplu:CoLqm7P5ebP4Kv2x@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres'

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

async function testConnection() {
  try {
    console.log('Testing Supabase POOLER connection...')
    const result = await pool.query('SELECT NOW()')
    console.log('✅ Connection successful!')
    console.log('Current time from database:', result.rows[0].now)
    await pool.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.error('Error code:', error.code)
    process.exit(1)
  }
}

testConnection()
