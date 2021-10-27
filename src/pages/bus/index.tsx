import Head from 'next/head';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import Layout from '@components/common/Layout';
import Search from '@components/bus/Search';
import Navbar from '@components/common/Navbar';
import HeaderBackground from '@components/common/HeaderBackground';
import TapaService from '@components/common/TapaService';
import Subscribe from '@components/common/Subscribe';

export default function Bus({ NavData, tapaServiceList }) {
  // const { data, loading, error } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  // console.log(error);
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
  const res = NavData;
  const tapaServiceList = TapaServiceList;
  return {
    props: {
      NavData: res,
      tapaServiceList: tapaServiceList,
    },
  };
};
