import Head from 'next/head';
import styles from './layout.module.scss';
import Company from '@data/company.json';
import Footer from '@components/common/footer';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Tapatrip - Bus Booking System</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          key="description"
          content="автобус, билет захиалга, автобусны билет захиалга, автобусны билет захиалга үнэ, автобусны хуваарь үнэ тариф, Bus, Train"
        />
        <meta
          name="title"
          key="title"
          content="Tapatrip - Bus Booking System"
        />
        <meta name="category" content="bus, travel, train" />
        <meta name="subject" content="bus" />
        <meta
          name="keywords"
          content="автобус, билет захиалга, автобусны билет захиалга, автобусны билет захиалга үнэ, автобусны хуваарь үнэ тариф, Bus, Train"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Tapatrip - Bus Booking System"
        />
        <meta property="og:locale" key="og:locale" content="mn_MN" />
        <meta property="og:email" content="crm@tapatrip.com" />
        <meta property="og:phone_number" content="75154444" />
        <meta
          property="og:street-address"
          content="ХУД, Ривер Гарден, 308 Тапатрип оффис"
        />
        <meta property="og:locality" content="Ulaanbaatar" />
        <meta property="og:region" content="UB" />
        <meta property="og:country-name" content="Mongolia" />
        <meta
          property="og:url"
          key="og:url"
          content="https://www.bus.tapatrip.com"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content="автобус, билет захиалга, автобусны билет захиалга, автобусны билет захиалга үнэ, автобусны хуваарь үнэ тариф, Bus, Train"
        />
      </Head>
      <main className={styles.main}>
        {children}
        <Footer companyInfo={Company} />
      </main>
    </>
  );
}
