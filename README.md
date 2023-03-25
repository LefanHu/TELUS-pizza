# TELUS - Pizza

A dockerized version of the application is running at https://telus.lefan.me

A mongoexpress interface for mongodb is running at https://mongoexpress.lefan.me

## Description

We’re setting up a new pizza ordering system.
 
We want users to go to our website and enter:
·         Their name and phone number
·         When they want their pizza (date and time)
·         If they want “Delivery” or “Pickup”
o   If it’s delivery they need to enter their address
·         What toppings they want (users can select upto 3 toppings):
o   Pepperoni
o   Mushrooms
o   Black Olives
o   Pineapple
 
Our employees would also need a web page that lists the user's name/phone number and when they want their food, sorted by when they want it, and selecting one of the items in the list would show a page with all the details.

## Requirements

1. Users are able to order pizza with restrictions
- No more than 3 toppings
2. Dashboard for information on orders and details of pizza. Some required information.
- time of order, scheduled delivery time, date, order type, order status (ready/preparing), (delivery or pickup), delivery status (delivered/on the way), name, phone number, delivery address

## Resources
- [mongodb integration example repo](https://github.com/mongodb-developer/mongodb-typescript-example)
- [next.js form examples](https://github.com/vercel/next.js/tree/canary/examples/next-forms)
- [next.js with mongoose](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose)
- [next.js documentation/guides](https://nextjs.org/docs/guides/building-forms)
- [buiding forms with next.js](https://nextjs.org/docs/guides/building-forms)
- [mongoose schema definition format](https://mongoosejs.com/docs/schematypes.html#)

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.
