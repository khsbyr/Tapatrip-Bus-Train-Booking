import Footer from '@components/common/footer';
import HeaderBackground from '@components/common/headerBackground';
import Navbar from '@components/common/navbar';
import Layout from '@components/common/layout';
import App from '@components/common/subscribe';
import TapaService from '@components/common/tapaService';
import Company from '@data/company.json';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import Head from 'next/head';
import styles from '@components/common/layout/layout.module.scss';
import React, { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Search from '@components/train/searchPanel';
import TrainService from '@services/train';
import LastSearch from '@components/train/lastSearch';

export default function Travel() {
  const [stationData, setStationData] = useState([]);
  const [lastSearch, setLastSearch] = useState([]);

  useEffect(() => {
    async function getTrainStations() {
      try {
        const res = await TrainService.getTrainStations();
        if (res && res.status === 200) {
          setStationData(res.result);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getTrainStations();

    if (typeof window !== 'undefined') {
      setLastSearch(JSON.parse(localStorage.getItem('lastSearch')));
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform1</title>
      </Head>
      <Layout>
        <div className={styles.main}>
          <HeaderBackground />
          <Navbar navbarData={NavData} />
          <Search navbarData={NavData} stationData={stationData} />
          {lastSearch ? <LastSearch /> : ''}
          <App />
          <TapaService tapaServiceList={TapaServiceList} />
        </div>
      </Layout>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  const res = NavData;
  return {
    props: {
      NavData: res,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}
