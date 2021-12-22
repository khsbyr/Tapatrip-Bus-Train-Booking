import SeatNav from '@components/bus/seatNavbar';
import Footer from '@components/common/footer';
import styles from '@components/common/layout/layout.module.scss';
import Company from '@data/company.json';
import NavData from '@data/navData.json';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import TravelProgram from '@components/tour/travelProgram';

export default function Tour() {
  return (
    <div>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <div className={styles.main}>
        <div className="relative">
          <div className="fixed z-20 w-screen top-0">
            <SeatNav />
          </div>
        </div>
        <div className="mt-20">
          <img src="/assets/tourImages/top-bg.jpg" alt="Logo" />
        </div>
        <TravelProgram />
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
