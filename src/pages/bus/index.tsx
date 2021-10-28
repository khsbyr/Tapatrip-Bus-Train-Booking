import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import Layout from '@components/common/Layout';
import Search from '@components/bus/Search';
import Navbar from '@components/common/Navbar';
import HeaderBackground from '@components/common/HeaderBackground';
import TapaService from '@components/common/TapaService';
import Subscribe from '@components/common/Subscribe';
import AuthService from '@services/auth';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

export default function Bus({ NavData, tapaServiceList, guestToken }) {
  useEffect(() => {
    AuthTokenStorageService.guestStore(guestToken);
  }, []);

  const { data, loading, error } = useQuery(BUS_ALL_LOCATIONS_QUERY);

  return (
    <Layout>
      <HeaderBackground />
      <Navbar navbarData={NavData} />
      <Search navbarData={NavData} />
      <Subscribe />
      <TapaService tapaServiceList={tapaServiceList} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const navData = NavData;
  const tapaServiceList = TapaServiceList;
  const guestToken = await AuthService.guestToken();
  return {
    props: {
      NavData: navData,
      tapaServiceList: tapaServiceList,
      guestToken: guestToken,
    },
  };
};
