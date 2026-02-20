import express from 'express'
import {
  registerBatch,
  getBatch,
  transferOwnership,
  flagBatch
} from '../controllers/batchController.js'

const router = express.Router()

router.post('/register', registerBatch)
router.get('/:batchId', getBatch)
router.post('/transfer', transferOwnership)
router.post('/flag', flagBatch)

export default router
