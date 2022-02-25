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
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import AuthService from '@services/auth';
import isEmpty from '@utils/isEmpty';
import { useGlobalStore } from '@context/globalStore';

export default function Travel({ guestToken }) {
  const [stationData, setStationData] = useState([]);
  const [lastSearch, setLastSearch] = useState([]);
  const { setUser } = useGlobalStore();

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

    AuthTokenStorageService.guestStore(guestToken);
    async function loadUserFromCookies() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : '';
      if (token) {
        try {
          const res = await AuthService.getCurrentUser(token);
          if (res && res?.status === 200) {
            if (!isEmpty(res?.result?.user)) {
              setUser(res?.result?.user);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    loadUserFromCookies();

    if (typeof window !== 'undefined') {
      setLastSearch(JSON.parse(localStorage.getItem('lastSearchTrain')));
    }
  }, []);

  return (
    <div>
      <Layout>
        <Head>
          <title>Tapatrip - Train Booking System</title>
        </Head>
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
  const guestToken = await AuthService.guestToken();
  return {
    props: {
      NavData: res,
      guestToken: guestToken,
      ...(await serverSideTranslations(locale, ['common', 'footer', 'train'])),
    },
  };
}
