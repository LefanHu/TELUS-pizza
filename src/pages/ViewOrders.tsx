// import Link from 'next/link'
import { FormEvent, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function ViewOrdersPage() {
  const [ordersData, setData] = useState(null)


  // Handle the submit event on form submit.
  const handleSubmitForm = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const form = event.target as HTMLFormElement

    // Send the form data to our API and get a response.
    const params = new URLSearchParams({
      customerName: `${form.customer.value}`,
      phoneNumber: `${form.number.value}`,
    })

    const response = await fetch(`/api/getOrders?${params.toString()}`, {
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    // Get the response data from server as JSON.
    const orders = JSON.parse(await response.json())
    // alert(`here's your orders ${orders.data} or just one of them: ${orders.data.placedOrders[0]}`)

    // test display
    setData(orders)
  }
  return (
    <div className="container">
      <h1 className={styles.title}>
        View Order Form
        {/* <Link href="/">with</Link> */}
      </h1>

      <form onSubmit={handleSubmitForm} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "inline-block", verticalAlign: "top" }}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="customer" required />
          <label htmlFor="phone">Phone Number</label>
          <input type="number" id="phone" name="number" required />
        </div>

        <button type="submit">View Orders</button>
      </form>

      {ordersData && (
        <div>
          <h2>Orders:</h2>
          <p>{JSON.stringify(ordersData)}</p>
        </div>
      )}
    </div >
  )
}
