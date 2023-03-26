import type { NextApiRequest, NextApiResponse } from 'next'
// import { ObjectId } from 'mongoose'
import dbConnect from '../../../lib/dbConnect.js'
import PlacedOrder from '../../../models/PlacedOrder.js'
import Customer from '../../../models/Customers.js'


type ResponseData = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req
  const order = req.body
  // console.log('body: ', order)

  // form validation
  // more than 3 toppings
  if (order.pineapples && order.mushrooms && order.pepperoni && order.olives) {
    return res.json({ data: "You can't choose more than 3 toppings >:(" })
  }

  // invalid delivery address
  if (order.delivery && !order.address) {
    return res.json({ data: "Error! You've selected delivery but didn't provide an address!" })
  }

  // invalid phone number
  if (isNaN(order.phoneNumber)) {
    return res.json({ data: "Error! Phone number you've entered contains more than just numbers!" })
  }

  // invalid date / time traveler
  if (Date.parse(order.scheduledTime) < Date.now()) {
    return res.json({ data: "Error! Do you have a time machine? This order is for the past!" })
  }

  // place actual order / send to database
  if (method != 'POST') {
    return res.status(400).json({ data: "something is suspicious ;-;" })
  }

  try {
    const result = await dbConnect();
    console.log(`database connected!!${result}`)

    // place order
    const placedOrder = await PlacedOrder.create(
      order
    )

    // check if customer has ordered before
    const orderingCustomer = {
      'customerName': order.customerName.toLowerCase(),
      'phoneNumber': order.phoneNumber,
      '$push': {
        'placedOrders': placedOrder._id
      }
    }
    const customer = await Customer.findOneAndUpdate(
      {
        'customerName': order.customerName.toLowerCase(),
        'phoneNumber': order.phoneNumber
      }, orderingCustomer,
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    )

    console.log(placedOrder)
    // console.log(customer)
    res.json({ data: "Order successfully placed! Thanks for ordering :)" })
  } catch (error) {
    res.status(400).json({ data: "Oops something went wrong while placing your order :0" })
    console.log(error)
  }


}
