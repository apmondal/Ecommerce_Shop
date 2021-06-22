import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRouter.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
const port = process.env.PORT || 4000

dotenv.config()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

connectDB()

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('Welcome to Ecommerce API')
    })
}

app.use(notFound)

app.use(errorHandler)

app.listen(port, () =>
    console.log(
        `Server listening in ${process.env.NODE_ENV} mode on port ${port}...`
            .yellow
    )
)
