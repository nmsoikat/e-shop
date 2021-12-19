import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import color from 'colors'
import Stripe from 'stripe'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

import productRouters from './routes/productRouters.js'
import userRouters from './routes/userRouters.js'
import orderRouters from './routes/orderRouters.js'
import Order from './models/orderModel.js'

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

const stripe = new Stripe(process.env.STRIPE_API_KEY)

app.post('/create-checkout-session', async (req, res) => {
  try {
    const order = await Order.findById(req.body.orderId)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: order.orderItems.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            unit_amount: item.price * 100, // dollar to cent
            product_data: {
              name: item.name,
            },
          },
          quantity: item.qty,
        }
      }),
      success_url: `${process.env.FE_URL}/payment_success`,
      cancel_url: `${process.env.FE_URL}/payment_cancel`,
    })

    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
    // console.log(e)
  }
})

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
