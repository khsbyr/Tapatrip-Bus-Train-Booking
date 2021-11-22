import Head from 'next/head';
import styles from './layout.module.scss';
import Company from '@data/company.json';
import Footer from '@components/common/Footer';
import NavData from '@data/navData.json';
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Tapatrip - Bus Booking System</title>
      </Head>
      <main className={styles.main}>
        {children}
        <Footer navbarData={NavData} />
      </main>
    </>
  );
}
