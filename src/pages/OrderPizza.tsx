// import Link from 'next/link'
import { FormEvent } from 'react'
import styles from '../styles/Home.module.css'

export default function OrderPizzaPage() {
  // Handle the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const form = event.target as HTMLFormElement

    // Get data from the form.
    const data = {
      customerName: form.customer.value as string,
      phoneNumber: form.number.value as Number,
      pepperoni: form.pepperoni.checked as boolean,
      mushrooms: form.mushrooms.checked as boolean,
      pineapples: form.pineapples.checked as boolean,
      olives: form.olives.checked as boolean,
      delivery: form.delivery.checked as boolean,
      address: form.address.value as string,
      datetime: form.datetime.value as string
    }

    // console.log(data)

    // Send the form data to our API and get a response.
    const response = await fetch('/api/order', {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST',
    })

    // Get the response data from server as JSON.
    const result = await response.json()
    alert(`${result.data}`)
  }
  return (
    <div className="container">
      <h1 className={styles.title}>
        Pizza Order Form
        {/* <Link href="/">with</Link> */}
      </h1>

      <p className={styles.description}>
        Happiness starts with a slice
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "inline-block", verticalAlign: "top" }}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="customer" required />
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" name="number" required />
        </div>

        <fieldset style={{ marginBottom: "1rem", border: "none" }}>
          <legend style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Select up to 3 pizza toppings:
          </legend>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="pepperoni" style={{ marginRight: "1rem", fontSize: "1.2rem" }}>
              Pepperoni
            </label>
            <input type="checkbox" id="pepperoni" name="pepperoni" value="pepperoni" style={{ marginRight: "1rem" }} />

            <label htmlFor="mushrooms" style={{ marginRight: "1rem", fontSize: "1.2rem" }}>
              Mushrooms
            </label>
            <input type="checkbox" id="mushrooms" name="toppings" value="mushrooms" style={{ marginRight: "1rem" }} />

            <label htmlFor="olives" style={{ marginRight: "1rem", fontSize: "1.2rem" }}>
              Black Olives
            </label>
            <input type="checkbox" id="olives" name="toppings" value="olives" />

            <label htmlFor="pineapples" style={{ marginRight: "1rem", fontSize: "1.2rem" }}>
              Pineapples (ew)
            </label>
            <input type="checkbox" id="pineapples" name="pineapples" value="pineapples" />
          </div>
        </fieldset>

        <label htmlFor="delivery">Delivery?</label>
        <input type="checkbox" id="delivery" name="delivery" />

        <label htmlFor="address">Delivery Address (If applicable)</label>
        <input type="text" id="address" name="address" />
        <label htmlFor="datetime">Scheduled For</label>
        <input type="datetime-local" id="datetime" name="datetime" required />



        <button type="submit">Place Order</button>
      </form>
    </div >
  )
}
