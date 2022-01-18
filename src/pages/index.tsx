import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import News from '@data/news.json';
import Layout from '@components/common/layout';
import Search from '@components/bus/searchPanel';
import Navbar from '@components/common/navbar';
import HeaderBackground from '@components/common/headerBackground';
import TapaService from '@components/common/tapaService';
import Subscribe from '@components/common/subscribe';
import AuthService from '@services/auth';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import { arrayFormat } from '@helpers/array-format';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import isEmpty from '@utils/isEmpty';
import { useGlobalStore } from '@context/globalStore';
import LastSearch from '@components/bus/lastSearch';

export default function Bus({ guestToken }) {
  const { t } = useTranslation(['common', 'footer']);
  const { setUser } = useGlobalStore();
  const [lastSearch, setLastSearch] = useState([]);

  useEffect(() => {
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
      setLastSearch(JSON.parse(localStorage.getItem('lastSearch')));
    }
  }, []);

  const { data, loading, error } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  if (error) return `Error! ${error.message}`;
  const startLocations = arrayFormat(data);
  return (
    <Layout>
      <HeaderBackground />
      <Navbar navbarData={NavData} />
      <Search navbarData={NavData} startLocations={startLocations} />
      {lastSearch ? <LastSearch /> : ''}
      <Subscribe />
      <TapaService tapaServiceList={TapaServiceList} tapaNews={News} />
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const guestToken = await AuthService.guestToken();
  return {
    props: {
      guestToken: guestToken,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}
