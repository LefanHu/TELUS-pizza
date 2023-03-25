// import Link from 'next/link'
import { FormEvent } from 'react'
import styles from '../styles/Home.module.css'

export default function ViewOrdersPage() {
  // Handle the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const form = event.target as HTMLFormElement

    console.log(form)

    // Send the form data to our API and get a response.
    const response = await fetch('/api/getOrders', {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify({
        customerName: form.customerName.value as string,
        phoneNumber: form.number.value as Number,
      }),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'GET',
    })

    // Get the response data from server as JSON.
    const orders = await response.json()
    console.log(orders)
  }
  return (
    <div className="container">
      <h1 className={styles.title}>
        View Order Form
        {/* <Link href="/">with</Link> */}
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "inline-block", verticalAlign: "top" }}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="customer" required />
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" name="number" required />
        </div>

        <button type="submit">View Orders</button>
      </form>
    </div >
  )
}
