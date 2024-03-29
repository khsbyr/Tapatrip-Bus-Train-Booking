import HeaderBackground from '@components/common/headerBackground';
import Layout from '@components/common/layout';
import styles from '@components/common/layout/layout.module.scss';
import Navbar from '@components/common/navbar';
import App from '@components/common/subscribe';
import TapaService from '@components/common/tapaService';
import LastSearch from '@components/train/lastSearch';
import Search from '@components/train/searchPanel';
import { useGlobalStore } from '@context/globalStore';
import NavData from '@data/navData.json';
import News from '@data/newsTrain.json';
import TapaServiceList from '@data/tapaServiceList.json';
import AuthService from '@services/auth';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import TrainService from '@services/train';
import isEmpty from '@utils/isEmpty';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function Travel({ guestToken }) {
  const [stationData, setStationData] = useState([]);
  const [lastSearch, setLastSearch] = useState([]);
  const { setUser } = useGlobalStore();

  useEffect(() => {
    AuthTokenStorageService.guestStore(guestToken);
    async function getTrainStations() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : AuthTokenStorageService.getGuestToken();
      if (token) {
        try {
          const res = await TrainService.getTrainStations(token);
          if (res && res.status === 200) {
            setStationData(res.result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    getTrainStations();

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
          <TapaService tapaServiceList={TapaServiceList} tapaNews={News} />
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
