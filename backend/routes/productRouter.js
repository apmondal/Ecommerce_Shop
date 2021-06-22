import express from 'express'
import {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @route   GET /api/products
router.route('/').get(getProducts).post(protect, admin, createProduct)

// @route   GET /api/products/:id
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router
