import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongoose'


type ResponseData = {
  data: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body = req.body
  console.log('body: ', body)

  // form validation
  if (body.pineapples && body.mushrooms && body.pepperoni && body.olives){
    return res.json({data: "You can't choose more than 3 toppings >:("})
  }

  
  // Both of these are required.
  if (!body.first || !body.last) {
    return res.json({ data: 'First or last name not found' })
  }

  // Found the name.
  res.json({ data: `${body.first} ${body.last}` })
}
