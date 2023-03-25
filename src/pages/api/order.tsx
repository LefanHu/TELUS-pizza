import type { NextApiRequest, NextApiResponse } from 'next'
// import { ObjectId } from 'mongoose'
import dbConnect from '../../../lib/dbConnect.js'
import PlacedOrder from '../../../models/PlacedOrder.js'


type ResponseData = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req
  const body = req.body
  console.log('body: ', body)

  // form validation
  // more than 3 toppings
  if (body.pineapples && body.mushrooms && body.pepperoni && body.olives) {
    return res.json({ data: "You can't choose more than 3 toppings >:(" })
  }

  // invalid delivery address
  if (body.delivery && !body.address) {
    return res.json({ data: "Error! You've selected delivery but didn't provide an address!" })
  }

  // place actual order / send to database
  if (method != 'POST') {
    return res.status(400).json({ data: "something is suspicious ;-;" })
  }
  const result = await dbConnect();
  console.log(`database connected!!${result}`)

  try {
    const placedOrder = await PlacedOrder.create(
      req.body
    )
    console.log(placedOrder)
    res.json({ data: "Order successfully placed! Thanks for ordering :)" })
  } catch (error) {
    res.status(400).json({ data: "Oops something went wrong while placing your order :0" })
  }


}
