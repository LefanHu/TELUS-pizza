import { useState, useEffect } from 'react';

interface Order {
  customerName: string,
  phoneNumber: number,
  address: string,
  delivery: boolean,
  scheduledTime: string,
  datetime: string,
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
      const params = new URLSearchParams();
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
          <ul>
            {ordersData.map((order) => (
              <li key={order.customerName}>{order.phoneNumber}</li>
            ))}
          </ul>
        </div>
      )
      }
    </div >
  );
}

// // import Link from 'next/link'
// import { FormEvent, useState } from 'react'
// import styles from '../styles/Home.module.css'

// export default async function EmployeeInterfacePage() {
//   const [ordersData, setData] = useState(null)

//   // Send the form data to our API and get a response.
//   const params = new URLSearchParams({
//     // empty as to return everything
//   })

//   const response = await fetch(`/api/getOrders?${params.toString()}`, {
//     // Tell the server we're sending JSON.
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'GET',
//   })

//   // Get the response data from server as JSON.
//   const orders_raw = await response.json()
//   const orders = JSON.parse(orders_raw.data)

//   return (
//     <div className="container">
//       <h1 className={styles.title}>
//         Employee Interface
//         {/* <Link href="/">with</Link> */}
//       </h1>

//       <ul>
//         {orders.map((order: {
//           customerName: string,
//           phoneNumber: number,
//           address: string,
//           delivery: boolean,
//           scheduledTime: string,
//           datetime: string,
//           mushrooms: boolean,
//           pineapples: boolean,
//           olives: boolean,
//           pepperoni: boolean,
//         }) => (
//           <li key={order.customerName}>{order.phoneNumber}</li>
//         ))}
//       </ul>
//     </div >
//   )
// }
