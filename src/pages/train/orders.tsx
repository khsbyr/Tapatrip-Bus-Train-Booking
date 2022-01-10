import Layout from '@components/common/layout';
import Card from '@components/train/card';
import TrainNavbar from '@components/train/navbar';
import NavData from '@data/navData.json';
import { ShieldExclamationIcon } from '@heroicons/react/solid';
import { Checkbox, Result } from 'antd';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TrainService from '@services/train';
import { useTrainContext } from '@context/trainContext';
import Loader from '@components/common/loader';

export default function Orders() {
  const { t } = useTranslation(['order']);
  const [voyageData, setVoyageData] = useState([]);
  const router = useRouter();
  const { startStation, endStation, date } = router.query;
  const { setLoading } = useTrainContext();
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setLoading(false);
    async function getTrainStations() {
      let params = {
        fromStation: startStation,
        toStation: endStation,
        date: date,
      };

      try {
        const res = await TrainService.getVoyageData(params);
        if (res && res.status === 200) {
          setVoyageData(res.result);
          setLoading(false);
          setIsLoad(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setIsLoad(false);
      }
    }
    getTrainStations();
  }, [startStation, endStation, date]);

  return (
    <Layout>
      <div className=" bg-bg">
        <TrainNavbar navbarData={NavData} />
        <div className="max-w-7xl mx-auto my-5 grid grid-cols-1 lg:grid-cols-3">
          <div className="md:col-span-2 space-y-5 lg:pr-5">
            <div className="px-2">
              <div className="bg-alert border border-alert h-auto flex items-center rounded-2xl space-x-5 px-2">
                <ShieldExclamationIcon className="w-7 h-7 ml-2 lg:ml-12 text-alert flex-shrink-0" />
                <p className="text-alert font-bold text-md md:text-lg py-3">
                  {t('covid19TripInformation')}
                </p>
              </div>
            </div>
            {isLoad ? (
              <Loader />
            ) : voyageData.length > 0 ? (
              voyageData?.map(voyage => <Card voyage={voyage} />)
            ) : (
              <Result
                status="404"
                title={t('ordersSearchResult')}
                subTitle={t('ordersSearchResultBody')}
              />
            )}
          </div>

          <div className="bg-white p-8 text-cardDate rounded-2xl space-y-4 text-lg h-64 mt-3">
            <div className="space-y-3">
              <p className="font-medium">Төрөл</p>
              <div className="space-y-1 px-2 text-base">
                <div className="flex justify-between">
                  <p className="text-secondary">Нийтийн</p>
                  <Checkbox></Checkbox>
                </div>
                <div className="flex justify-between">
                  <p className="text-secondary">Унтлагын</p>
                  <Checkbox></Checkbox>
                </div>
                <div className="flex justify-between">
                  <p className="text-secondary">Тасалгаат</p>
                  <Checkbox></Checkbox>
                </div>
              </div>
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
