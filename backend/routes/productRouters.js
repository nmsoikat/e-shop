import express from 'express'

import {
  getProductById,
  getProducts,
} from '../controller/productsController.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)

export default router

// asyncHandler for avoid try catch block
