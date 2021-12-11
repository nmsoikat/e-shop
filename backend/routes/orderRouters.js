import express from 'express'
import {
  addOrder,
  getOrderById,
  getOrders,
} from '../controller/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(protect, addOrder)
router.route('/all').get(protect, getOrders)
router.route('/:id').get(protect, getOrderById)
export default router
