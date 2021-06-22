import express from 'express'
import {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @route   GET /api/products
router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect, createProductReview)

// @route   GET /api/products/:id
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router
