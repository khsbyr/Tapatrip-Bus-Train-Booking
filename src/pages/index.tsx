import Head from 'next/head';
import React from 'react';
import NavData from '@data/navData.json';
import Layout from '@components/common/Layout';
import HeaderBackground from '@components/common/HeaderBackground';
import Navbar from '@components/common/Navbar';
import Subscribe from '@components/common/Subscribe';

export default function Home({ NavData }) {
  return (
    <Layout>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <HeaderBackground />
      <Navbar navbarData={NavData} />
      <Subscribe />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = NavData;

  return {
    props: {
      NavData: res,
    },
  };
};
