import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

// @des     Create new order
// @route   POST /api/orders
// @access  Private
const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items!')
    return
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    })

    const createOrder = await order.save()

    res.status(201).json(createOrder)
  }
})

// @des     Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found!')
  }
})

// @des     Get all order
// @route   GET /api/orders/all
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()

  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error('Orders not found!')
  }
})

export { addOrder, getOrderById, getOrders }
