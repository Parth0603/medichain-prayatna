import {
  getAllBatches,
  getDashboardStats,
  getRecentActivity,
  getBatchById,
  getShipmentsByBatchId
} from '../services/databaseService.js'

export async function getStats(req, res) {
  try {
    const stats = await getDashboardStats()
    res.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export async function getBatches(req, res) {
  try {
    const batches = await getAllBatches()
    res.json(batches)
  } catch (error) {
    console.error('Error fetching batches:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export async function getActivity(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10
    const activity = await getRecentActivity(limit)
    res.json(activity)
  } catch (error) {
    console.error('Error fetching activity:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export async function getBatchDetails(req, res) {
  try {
    const { batchId } = req.params
    const batch = await getBatchById(batchId)
    const shipments = await getShipmentsByBatchId(batchId)
    
    res.json({
      batch,
      shipments
    })
  } catch (error) {
    console.error('Error fetching batch details:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
