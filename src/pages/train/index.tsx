import Footer from '@components/common/footer';
import HeaderBackground from '@components/common/headerBackground';
import Navbar from '@components/common/navbar';
import App from '@components/common/subscribe';
import TapaService from '@components/common/tapaService';
import Company from '@data/company.json';
import NavData from '@data/navData.json';
import TapaServiceList from '@data/tapaServiceList.json';
import Head from 'next/head';
import styles from '@components/common/layout/layout.module.scss';
import React, { useState } from 'react';
import Loader from '@components/common/loader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Search from '@components/train/searchPanel';
import { arrayFormat } from '@helpers/array-format';
import { useQuery } from '@apollo/client';
import { BUS_ALL_LOCATIONS_QUERY } from '@graphql/queries';
export default function Travel() {
  const { data, loading, error } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  if (error) return `Error! ${error.message}`;
  const startLocations = arrayFormat(data);
  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <div className={styles.main}>
        <HeaderBackground />
        <Navbar navbarData={NavData} />
        <Search navbarData={NavData} startLocations={startLocations} />
        <App />
        <TapaService tapaServiceList={TapaServiceList} />
        <Footer companyInfo={Company} />
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  const res = NavData;
  return {
    props: {
      NavData: res,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}
