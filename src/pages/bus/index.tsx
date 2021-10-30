import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import Layout from '@components/common/Layout';
import Search from '@components/bus/SearchPanel';
import Navbar from '@components/common/Navbar';
import HeaderBackground from '@components/common/HeaderBackground';
import TapaService from '@components/common/TapaService';
import Subscribe from '@components/common/Subscribe';
import AuthService from '@services/auth';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import arrayFormat from '@helpers/array-format';

export default function Bus({ NavData, tapaServiceList, guestToken }) {
  useEffect(() => {
    AuthTokenStorageService.guestStore(guestToken);
  }, []);

  const { data } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  const startLocations = arrayFormat(data);

  return (
    <Layout>
      <HeaderBackground />
      <Navbar navbarData={NavData} />
      <Search navbarData={NavData} startLocations={startLocations} />
      <Subscribe />
      <TapaService tapaServiceList={tapaServiceList} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
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
}
