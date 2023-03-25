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
  const customer = req.body
  // console.log('body: ', order)

  // invalid phone number
  if (isNaN(customer.phoneNumber)) {
    return res.json({ data: "Error! Phone number is invalid" })
  }

  // place actual order / send to database
  if (method != 'GET') {
    return res.status(400).json({ data: "something is suspicious ;-;" })
  }

  try {
    const result = await dbConnect();
    console.log(`database connected!!${result}`)

    // fetch orders
    const orders = Customer.findOne({
      'customerName': customer.customerName.toLowerCase(),
      'phoneNumber': customer.phoneNumber,
    }, 'placedOrders')

    console.log(orders)

    res.status(200).json({
      data: "request went through!",
    })
  } catch (error) {
    res.status(400).json({ data: "Oops something went wrong while placing your order :0" })
    console.log(error)
  }


}
