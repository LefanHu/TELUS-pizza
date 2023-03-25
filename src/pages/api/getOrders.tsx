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
  const { customerName, phoneNumber } = req.query

  console.log(`${customerName} and ${phoneNumber}`)
  // place actual order / send to database
  if (method != 'GET') {
    return res.status(400).json({ data: "something is suspicious ;-;" })
  }

  try {
    const result = await dbConnect();
    console.log(`now getting stuff from database!!${result}`)

    // console.log(`${customerName} and ${phoneNumber}`)
    // fetch orders
    const order_ids = await Customer.findOne({
      'customerName': customerName,
      'phoneNumber': Number(phoneNumber),
    }).select({ placedOrders: 1, _id: 0})
    console.log(order_ids)

    // get actual orders with order_ids
    const orders = await PlacedOrder.find(
      {_id: {$in: order_ids?.placedOrders}}
    )

    console.log(orders)
    
    
    res.status(200).json({
      data: JSON.stringify(order_ids)
    })
  } catch (error) {
    res.status(400).json({ data: "Oops something went wrong while placing your order :0" })
    console.log(error)
  }


}
