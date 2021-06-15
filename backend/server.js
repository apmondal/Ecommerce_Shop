import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRouter.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

dotenv.config()

connectDB()

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(port, () =>
    console.log(
        `Server listening in ${process.env.NODE_ENV} mode on port ${port}...`
            .yellow
    )
)
