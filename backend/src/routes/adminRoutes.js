import express from 'express'
import { deleteAll } from '../controllers/adminController.js'

const router = express.Router()

router.post('/delete-all', deleteAll)

export default router
