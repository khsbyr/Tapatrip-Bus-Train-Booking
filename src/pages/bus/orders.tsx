import React, { useEffect } from 'react';
import NavData from '@data/navData.json';
import { useQuery } from '@apollo/client';
import {
  BUS_ALL_LOCATIONS_QUERY,
  BUS_ALL_SCHEDULES_QUERY,
} from '@graphql/queries';
import { Result } from 'antd';
import Card from '@components/bus/card';
import { ShieldExclamationIcon } from '@heroicons/react/solid';
import BusNavbar from '@components/bus/navbar';
import Layout from '@components/common/layout';
import { useRouter } from 'next/router';
import { arrayFormat } from '@helpers/array-format';
import Loader from '@components/common/loader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import AuthService from '@services/auth';
import isEmpty from '@utils/isEmpty';
import { useGlobalStore } from '@context/globalStore';

export default function Orders() {
  const { t } = useTranslation(['order']);
  const router = useRouter();
  const { setUser } = useGlobalStore();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = AuthTokenStorageService.getAccessToken();
      if (token) {
        try {
          const res = await AuthService.getCurrentUser();
          if (res && res?.status === 200) {
            if (!isEmpty(res?.result?.user)) {
              setUser(res?.result?.user);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    loadUserFromCookies();
  }, []);

  const { startLocation, stopLocation, endLocation, date, endDate } =
    router.query;
  const { data } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  const {
    data: scheduleData,
    loading,
    error,
  } = useQuery(BUS_ALL_SCHEDULES_QUERY, {
    variables: {
      startLocation: startLocation ? startLocation : '',
      stopLocation: stopLocation ? stopLocation : '',
      locationEnd: endLocation ? endLocation : '',
      leaveDate: date ? date + ',' + endDate : '',
    },
  });
  if (error) return `Error! ${error.message}`;

  const scheduleResult =
    scheduleData === undefined ? '' : scheduleData.busAllSchedules.edges;
  const startLocations = arrayFormat(data);

  return (
    <Layout>
      <div className=" bg-bg">
        <BusNavbar startLocations={startLocations} />
        <div className="max-w-7xl mx-auto my-5 grid grid-cols-1 lg:grid-cols-3">
          <div className="md:col-span-2 space-y-5">
            <div
              className={
                date === scheduleResult[0]?.node?.leaveDate ? 'hidden' : 'px-2'
              }
            >
              <div className="bg-alert border border-alert h-auto flex items-center rounded-2xl space-x-5 px-2">
                <ShieldExclamationIcon className="w-7 h-7 ml-2 lg:ml-12 text-alert flex-shrink-0" />
                <p className="text-alert font-bold text-md md:text-lg py-3">
                  {t('warningTripInformation')}
                </p>
              </div>
            </div>
            {loading ? <Loader /> : ''}
            {scheduleResult.length > 0 ? (
              scheduleResult.map(schedules => (
                <Card key={schedules.node.id} datas={schedules} />
              ))
            ) : (
              <Result
                status="404"
                title={t('ordersSearchResult')}
                subTitle={t('ordersSearchResultBody')}
              />
            )}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-0 ">
              <a
                href="https://www.facebook.com/TapaTripTravelAgency/"
                target="_blank"
              >
                <img src="/assets/Thailand.jpg" className="rounded-lg" />{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer', 'order'])),
    },
  };
}
