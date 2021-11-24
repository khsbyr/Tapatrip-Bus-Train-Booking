import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import Layout from '@components/common/Layout';
import Search from '@components/bus/searchPanel';
import Navbar from '@components/common/Navbar';
import HeaderBackground from '@components/common/HeaderBackground';
import TapaService from '@components/common/TapaService';
import Subscribe from '@components/common/Subscribe';
import AuthService from '@services/auth';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import { arrayFormat } from '@helpers/array-format';
import Loader from '@components/common/Loader';

export default function Bus({ guestToken }) {
  useEffect(() => {
    AuthTokenStorageService.guestStore(guestToken);
  }, []);
  const { data, loading, error } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  if (error) return `Error! ${error.message}`;
  const startLocations = arrayFormat(data);
  return (
    <Layout>
      <HeaderBackground />
      <Navbar navbarData={NavData} />
      <Search navbarData={NavData} startLocations={startLocations} />
      {loading && <Loader />}
      <Subscribe />
      <TapaService tapaServiceList={TapaServiceList} />
    </Layout>
  );
}

export async function getStaticProps() {
  const guestToken = await AuthService.guestToken();
  return {
    props: {
      guestToken: guestToken,
    },
  };
}
