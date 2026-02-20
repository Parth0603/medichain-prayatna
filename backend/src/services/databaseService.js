import pool from '../config/database.js'

// Save batch to database
export async function saveBatch(batchData) {
  const { batchId, productName, quantity, expiryDate, storageRules, currentOwner, txHash } = batchData
  
  const query = `
    INSERT INTO batches (batch_id, product_name, quantity, expiry_date, storage_rules, current_owner, tx_hash)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (batch_id) DO UPDATE SET
      product_name = EXCLUDED.product_name,
      quantity = EXCLUDED.quantity,
      expiry_date = EXCLUDED.expiry_date,
      storage_rules = EXCLUDED.storage_rules,
      current_owner = EXCLUDED.current_owner
    RETURNING *
  `
  
  const values = [batchId, productName, quantity, expiryDate, storageRules, currentOwner, txHash]
  const result = await pool.query(query, values)
  return result.rows[0]
}

// Save shipment to database
export async function saveShipment(shipmentData) {
  const { 
    batchId, 
    location, 
    temperature, 
    isBreach, 
    timestamp, 
    txHash,
    fromType,
    fromName,
    fromAddress,
    fromContact,
    toType,
    toName,
    toAddress,
    toContact
  } = shipmentData
  
  const query = `
    INSERT INTO shipments (
      batch_id, location, temperature, is_breach, timestamp, tx_hash,
      from_type, from_name, from_address, from_contact,
      to_type, to_name, to_address, to_contact
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *
  `
  
  const values = [
    batchId, location, temperature, isBreach, timestamp, txHash,
    fromType, fromName, fromAddress, fromContact,
    toType, toName, toAddress, toContact
  ]
  const result = await pool.query(query, values)
  return result.rows[0]
}

// Update batch owner
export async function updateBatchOwner(batchId, newOwner) {
  const query = `
    UPDATE batches
    SET current_owner = $1
    WHERE batch_id = $2
    RETURNING *
  `
  
  const result = await pool.query(query, [newOwner, batchId])
  return result.rows[0]
}

// Flag batch
export async function flagBatchInDB(batchId) {
  const query = `
    UPDATE batches
    SET is_flagged = TRUE
    WHERE batch_id = $1
    RETURNING *
  `
  
  const result = await pool.query(query, [batchId])
  return result.rows[0]
}

// Get all batches
export async function getAllBatches() {
  const query = `
    SELECT * FROM batches
    ORDER BY created_at DESC
  `
  
  const result = await pool.query(query)
  return result.rows
}

// Get batch by ID
export async function getBatchById(batchId) {
  const query = `
    SELECT * FROM batches
    WHERE batch_id = $1
  `
  
  const result = await pool.query(query, [batchId])
  return result.rows[0]
}

// Get shipments for batch
export async function getShipmentsByBatchId(batchId) {
  const query = `
    SELECT * FROM shipments
    WHERE batch_id = $1
    ORDER BY timestamp ASC
  `
  
  const result = await pool.query(query, [batchId])
  return result.rows
}

// Get dashboard stats
export async function getDashboardStats() {
  const totalBatchesQuery = 'SELECT COUNT(*) as count FROM batches'
  const flaggedBatchesQuery = 'SELECT COUNT(*) as count FROM batches WHERE is_flagged = TRUE'
  const totalShipmentsQuery = 'SELECT COUNT(*) as count FROM shipments'
  const breachesQuery = 'SELECT COUNT(*) as count FROM shipments WHERE is_breach = TRUE'
  const expiredBatchesQuery = 'SELECT COUNT(*) as count FROM batches WHERE expiry_date < EXTRACT(EPOCH FROM NOW())'
  
  const [totalBatches, flaggedBatches, totalShipments, breaches, expiredBatches] = await Promise.all([
    pool.query(totalBatchesQuery),
    pool.query(flaggedBatchesQuery),
    pool.query(totalShipmentsQuery),
    pool.query(breachesQuery),
    pool.query(expiredBatchesQuery)
  ])
  
  return {
    totalBatches: parseInt(totalBatches.rows[0].count),
    activeBatches: parseInt(totalBatches.rows[0].count) - parseInt(flaggedBatches.rows[0].count) - parseInt(expiredBatches.rows[0].count),
    flaggedBatches: parseInt(flaggedBatches.rows[0].count),
    totalShipments: parseInt(totalShipments.rows[0].count),
    temperatureBreaches: parseInt(breaches.rows[0].count),
    expiredBatches: parseInt(expiredBatches.rows[0].count)
  }
}

// Get recent activity
export async function getRecentActivity(limit = 10) {
  const query = `
    SELECT 
      b.batch_id,
      b.product_name,
      b.current_owner,
      b.created_at,
      'batch_registered' as activity_type,
      NULL as from_type,
      NULL as to_type
    FROM batches b
    UNION ALL
    SELECT 
      s.batch_id,
      b.product_name,
      b.current_owner,
      s.created_at,
      CASE 
        WHEN s.is_breach THEN 'temperature_breach'
        ELSE 'shipment_added'
      END as activity_type,
      s.from_type,
      s.to_type
    FROM shipments s
    JOIN batches b ON s.batch_id = b.batch_id
    ORDER BY created_at DESC
    LIMIT $1
  `
  
  const result = await pool.query(query, [limit])
  return result.rows
}

// Get last shipment for batch
export async function getLastShipmentForBatch(batchId) {
  const query = `
    SELECT * FROM shipments
    WHERE batch_id = $1
    ORDER BY timestamp DESC
    LIMIT 1
  `
  
  const result = await pool.query(query, [batchId])
  return result.rows[0]
}

// Update shipment to mark as breach
export async function updateShipmentBreach(shipmentId, temperature) {
  const query = `
    UPDATE shipments
    SET is_breach = TRUE, temperature = $1
    WHERE id = $2
    RETURNING *
  `
  
  const result = await pool.query(query, [temperature, shipmentId])
  return result.rows[0]
}

// Delete all data (admin function)
export async function deleteAllData() {
  await pool.query('TRUNCATE TABLE shipments CASCADE')
  await pool.query('TRUNCATE TABLE batches CASCADE')
  return { success: true, message: 'All data deleted successfully' }
}
