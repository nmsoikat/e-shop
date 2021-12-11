import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import color from 'colors'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

import productRouters from './routes/productRouters.js'
import userRouters from './routes/userRouters.js'
import orderRouters from './routes/orderRouters.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRouters)
app.use('/api/users', userRouters)
app.use('/api/orders', orderRouters)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
)
