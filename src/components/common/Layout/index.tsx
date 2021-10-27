import Head from 'next/head';
import styles from './layout.module.scss';
import NavData from '@data/navData.json';
import Footer from '@components/common/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Tapatrip - Bus Booking System</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
}
