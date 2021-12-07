import Head from 'next/head';
import React from 'react';
import NavData from '@data/navData.json';
import Layout from '@components/common/layout';
import Navbar from '@components/bus/seatNavbar';
import Profile from './myProfile';
import Orders from './myOrders';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export default function index() {
  return (
    <Layout>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <Navbar />

      <div className="w-full">
        <div className="max-w-7xl mx-auto bg-bg">
          <div className="grid grid-cols-4 py-5 space-x-5">
            <div className="col-span-3 bg-white rounded-lg shadow-md p-5">
              <Profile />
              <Orders />
            </div>
            <div className="col-span-1 bg-white rounded-lg shadow-md p-4 text-cardDate">
              {/* <div
                className="p-3 hover:bg-bg rounded cursor-pointer hover:text-blue-400"
                onClick={}
              >
                Хэрэглэгчийн хэсэг
              </div>
              <div
                className="p-3 hover:bg-bg rounded cursor-pointer hover:text-blue-400"
                onClick={}
              >
                Миний захиалгууд
              </div> */}
              <div className="p-3 hover:bg-bg text-red-600 rounded cursor-pointer">
                <a href="/bus">Системээс гарах</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
