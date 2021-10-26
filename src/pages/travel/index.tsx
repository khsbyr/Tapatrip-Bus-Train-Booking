import React from 'react';
import Head from 'next/head';
import NavData from '@data/navData.json';
import Layout from '@components/Layout/Layout';
import Header from '@components/Header/Header';
function About() {
  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <div className="bg-bg font-Roboto">
        <Header />
      </div>
      <Layout navbarData={NavData} />
    </div>
  );
}

export default About;
