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
            <Collapsible className={styles.collapsible} key={order._id} trigger={order.customerName + "   Phone number: " + order.phoneNumber}>
              <p className={styles.collapsible_p}>
                Customer Name: {order.customerName}
              </p>
              <p className={styles.collapsible_p}>
                Phone Number: {order.phoneNumber}
              </p>
              <p className={styles.collapsible_p}>
                Delivery Address: {order.address}
              </p>
              <p className={styles.collapsible_p}>
                Scheduled Delivery Time: {order.scheduledTime}
              </p>
              <p className={styles.collapsible_p}>
                Toppings - Pepperoni: {order.pepperoni}  Black Olives: {order.olives}  Mushrooms: {order.mushrooms}  Pineapples: {order.pineapples}
              </p>
            </Collapsible>
          ))}
        </div>
      )
      }
    </div >
  );
}
