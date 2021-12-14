import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import NavData from '@data/navData.json';
import Layout from '@components/common/layout';
import Navbar from '@components/bus/seatNavbar';
import Profile from '@components/common/userSection/myProfile';
import Orders from '@components/common/userSection/myOrders';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import AuthService from '@services/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import isEmpty from '@utils/isEmpty';
import { useTranslation } from 'next-i18next';
import { useGlobalStore } from '@context/globalStore';

export default function index() {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router.query;
  const { setUser } = useGlobalStore();

  const token =
    AuthTokenStorageService.getAccessToken() &&
    AuthTokenStorageService.getAccessToken() != 'false'
      ? AuthTokenStorageService.getAccessToken()
      : '';

  const handleLogout = () => {
    AuthService.logout();
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      if (token) {
        try {
          const res = await AuthService.getCurrentUser(token);
          if (res && res?.status === 200) {
            if (!isEmpty(res?.result?.user)) {
              setUser(res?.result?.user);
            }
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        router.push('/bus');
      }
    }
    loadUserFromCookies();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Tapatrip - Online Travel Platform</title>
      </Head>
      <Navbar />
      <div className="w-full">
        <div className="max-w-7xl mx-auto bg-bg">
          <div className="py-5 gap-5 flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-5">
              {slug === 'profile' ? (
                <Profile />
              ) : slug === 'orders' ? (
                <Orders />
              ) : (
                ''
              )}
            </div>
            <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 text-cardDate">
              <button
                className={`${
                  slug === 'profile' ? 'bg-bg text-blue-400' : ''
                } w-full flex justify-start p-3 hover:bg-bg rounded cursor-pointer hover:text-blue-400`}
                onClick={() => router.push('/user/profile')}
              >
                {t('customerSection')}
              </button>
              <button
                className={`${
                  slug === 'orders' ? 'bg-bg text-blue-400' : ''
                } w-full flex justify-start p-3 hover:bg-bg rounded cursor-pointer hover:text-blue-400`}
                onClick={() => router.push('/user/orders')}
              >
                {t('myOrders')}
              </button>
              <div className="w-full flex justify-start p-3 hover:bg-red-100 text-red-600 rounded cursor-pointer">
                <a
                  href="/bus"
                  className="hover:text-red-600"
                  onClick={handleLogout}
                >
                  {t('logout')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ locale }) {
  const res = NavData;
  return {
    props: {
      NavData: res,
      ...(await serverSideTranslations(locale, ['common', 'footer', 'steps'])),
    },
  };
}
