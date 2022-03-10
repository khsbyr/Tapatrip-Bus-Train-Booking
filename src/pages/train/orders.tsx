import Layout from '@components/common/layout';
import Card from '@components/train/card';
import Loader from '@components/train/loader';
import TrainNavbar from '@components/train/navbar';
import { useTrainContext } from '@context/trainContext';
import NavData from '@data/navData.json';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import TrainService from '@services/train';
import { Result } from 'antd';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Orders() {
  const { t } = useTranslation(['order']);
  const [voyageData, setVoyageData] = useState([]);
  const router = useRouter();
  const { startStation, endStation, date } = router.query;
  const { setLoading } = useTrainContext();
  const [isLoad, setIsLoad] = useState(true);
  const { setSelectedSeats, setOrderId, setEndDate } = useTrainContext();

  useEffect(() => {
    setLoading(false);
    setSelectedSeats([]);
    setOrderId(undefined);
    setEndDate(undefined);
    async function getTrainStations() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : AuthTokenStorageService.getGuestToken();
      if (token) {
        let params = {
          fromStation: startStation,
          toStation: endStation,
          date: date,
        };

        try {
          const res = await TrainService.getVoyageData(params, token);
          if (res && res.status === 200) {
            setVoyageData(res.result);
            setLoading(false);
            setIsLoad(false);
          }
          if (res && res.status === 400) {
            setLoading(false);
            setIsLoad(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
          setIsLoad(false);
        }
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

          <div className="hidden lg:block">
            <div className="sticky top-0 ">
              <a
                href="https://www.facebook.com/TapaTripTravelAgency/"
                target="_blank"
              >
                <img src="/assets/vietnam.png" className="rounded-lg" />{' '}
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
      ...(await serverSideTranslations(locale, [
        'common',
        'footer',
        'order',
        'train',
      ])),
    },
  };
}
