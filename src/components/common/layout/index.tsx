import Head from 'next/head';
import styles from './layout.module.scss';
import Company from '@data/company.json';
import Footer from '@components/common/footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
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
        <meta name="title" key="title" content="Tapatrip - Bus Booking System" />
        <meta name="category" content="bus, travel, train" />
        <meta name="subject" content="bus" />
        <meta
          name="keywords"
          content="автобус, билет захиалга, автобусны билет захиалга, автобусны билет захиалга үнэ, автобусны хуваарь үнэ тариф, Bus, Train"
        />
        <meta
          property="og:title"
          key="ogtitle"
          content="Tapatrip - Bus Booking System"
        />
        <meta property="og:locale" key="og:locale" content="mn_MN" />
        {router.asPath === '/' && (
          <meta property="og:image" content="/images/fb_cover.jpg" />
        )}
        <meta property="fb:app_id" content="476931413433212" />
        <meta property="fb:page_id" content="1421291734678399" />
        <meta property="og:email" content="crm@tapatrip.com" />
        <meta property="og:phone_number" content="75154444" />
        <meta
          property="og:street-address"
          content="ХУД, Ривер Гарден, 308 Тапатрип оффис"
        />
        <meta property="og:locality" content="Ulaanbaatar" />
        <meta property="og:region" content="UB" />
        <meta property="og:country-name" content="Mongolia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://www.bus.tapatrip.com" />
        <meta name="twitter:title" content="TapaTrip" />
        <meta name="twitter:image" content="/fb_cover.png" />
        <meta
          property="og:url"
          key="ogurl"
          content="https://www.bus.tapatrip.com"
        />
        <meta property="og:type" key="ogtype" content="website" />
        <meta
          property="og:description"
          content="автобус, билет захиалга, автобусны билет захиалга, автобусны билет захиалга үнэ, автобусны хуваарь үнэ тариф, Bus, Train"
        />
        <meta
          name="google-site-verification"
          content="jLGHUohzVujDpZVKJOgJScLlCCZMh3D-_8neGKul6IQ"
        />
      </Head>
      <main className={styles.main}>
        {children}
        <Footer companyInfo={Company} />
      </main>
    </>
  );
}
