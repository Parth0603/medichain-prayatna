import express from 'express'
import {
  getStats,
  getBatches,
  getActivity,
  getBatchDetails
} from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/stats', getStats)
router.get('/batches', getBatches)
router.get('/activity', getActivity)
router.get('/batch/:batchId', getBatchDetails)

export default router
