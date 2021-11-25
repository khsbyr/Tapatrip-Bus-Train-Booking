import Head from 'next/head';
import React from 'react';
import NavData from '@data/navData.json';
import Layout from '@components/common/layout';
import HeaderBackground from '@components/common/headerBackground';
import Navbar from '@components/common/navbar';
import Subscribe from '@components/common/subscribe';

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
