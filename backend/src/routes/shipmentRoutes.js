import express from 'express'
import {
  addShipment,
  getShipmentHistory,
  simulateBreach
} from '../controllers/shipmentController.js'

const router = express.Router()

router.post('/add', addShipment)
router.get('/history/:batchId', getShipmentHistory)
router.post('/simulate-breach', simulateBreach)

export default router
