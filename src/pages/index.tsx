import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function IndexPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TELUS Pizza Orders</title>
        <meta name="description" content="simple pizza ordering web-app" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Order some PIZZA! Or view your orders.
        </h1>

        <div style={{width: 'vw', height: 'vh'}}>
          <Image src="pizza.jpg" alt="pizza image" width={1050} height={850} unoptimized></Image>
        </div>
          
        {/* <p className={styles.description}> */}
        {/*   A simple web app by Lefan Hu */}
        {/* </p> */}

        <div className={styles.grid}>
          <Link href="/OrderPizza" className={styles.card}>
            <h2>Place an order &rarr;</h2>
            <p>Order a pizza using a form</p>
          </Link>

          <Link href="/ViewOrders" className={styles.card}>
            <h2>View your orders &rarr;</h2>
            <p>An interface for all placed pizza orders.</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
