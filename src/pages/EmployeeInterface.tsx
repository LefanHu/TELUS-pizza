import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import styles from '../styles/Home.module.css'

interface Order {
  _id: number,
  customerName: string,
  phoneNumber: number,
  address: string,
  delivery: boolean,
  scheduledTime: string,
  mushrooms: boolean,
  pineapples: boolean,
  olives: boolean,
  pepperoni: boolean,
}

export default function EmployeeInterfacePage() {
  // const [ordersData, setOrdersData] = useState(null);
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams({ // return everything
        customerName: "",
        phoneNumber: "",
        all: "true",
      });

      const response = await fetch(`/api/getOrders?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      const orders_raw = await response.json();
      const orders = JSON.parse(orders_raw.data);

      // sorting orders
      orders.sort(function(a: Order, b: Order) {
        // convert to date object
        const a_date = Date.parse(a.scheduledTime)
        const b_date = Date.parse(b.scheduledTime)
        return a_date - b_date;
      });
      setOrdersData(orders);
    }
    fetchData();
  }, []);


  return (
    <div className="container">
      <h1>Employee Interface</h1>
      {ordersData && (
        <div>
          <h2>Orders:</h2>
          {ordersData.map((order) => (
            <Collapsible className={styles.collapsible} key={order._id} trigger={"Name: " + order.customerName + "   Phone: " + order.phoneNumber + "  TIME: " + order.scheduledTime}>
              <p className={styles.collapsible_p}>
                Customer Name: {order.customerName}
              </p>
              <p className={styles.collapsible_p}>
                Phone Number: {order.phoneNumber}
              </p>
              <p className={styles.collapsible_p}>
                Delivery: {(order.delivery)? "true" : "false"}
              </p>
              <p className={styles.collapsible_p}>
                Delivery Address: {order.address}
              </p>
              <p className={styles.collapsible_p}>
                Scheduled Time: {order.scheduledTime}
              </p>
              <p className={styles.collapsible_p}>
                Toppings:
                {(order.pepperoni) ? "Pepperoni " : ""}
                {(order.olives) ? "Black Olives " : ", "}
                {(order.mushrooms) ? "Mushrooms " : ", "}
                {(order.pineapples) ? "Pineapples " : ""}
              </p>
            </Collapsible>
          ))}
        </div>
      )
      }
    </div >
  );
}
