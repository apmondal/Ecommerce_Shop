import express from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'

const router = express.Router()

// @route   GET /api/products
router.route('/').get(getProducts)

// @route   GET /api/products/:id
router.route('/:id').get(getProductById)

export default router
