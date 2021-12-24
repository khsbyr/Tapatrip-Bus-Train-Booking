import Head from 'next/head';
import styles from './layout.module.scss';
import Company from '@data/company.json';
import Footer from '@components/common/footer';
import { DefaultSeo } from 'next-seo';
import config from '@config/seo.json';

export default function Layout({ children }) {
  return (
    <>
      <DefaultSeo {...config} />
      <Head>
        <title>Tapatrip - Bus Booking System</title>
      </Head>
      <main className={styles.main}>
        {children}
        <Footer companyInfo={Company} />
      </main>
    </>
  );
}
