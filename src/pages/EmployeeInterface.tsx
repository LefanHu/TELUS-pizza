import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';

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
            <Collapsible trigger={order.customerName}>
              <p>
                Customer Name: {order.customerName}
                Phone Number: {order.phoneNumber}
                Delivery Address: {order.address}
                Scheduled Delivery Time: {order.datetime}
              </p>
            </Collapsible>
          ))}
        </div>
      )
      }
    </div >
  );
}
