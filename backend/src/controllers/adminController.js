import { deleteAllData } from '../services/databaseService.js'

export async function deleteAll(req, res) {
  try {
    const result = await deleteAllData()
    
    res.json({
      success: true,
      message: 'All data deleted successfully from database'
    })
  } catch (error) {
    console.error('Error deleting data:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
