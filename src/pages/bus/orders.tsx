import React from 'react';
import NavData from '@data/navData.json';
import { useQuery } from '@apollo/client';
import {
  BUS_ALL_LOCATIONS_QUERY,
  BUS_ALL_SCHEDULES_QUERY,
} from '@graphql/queries';
import { Result, Button } from 'antd';
import Card from '@components/bus/Card';
import { ShieldExclamationIcon } from '@heroicons/react/solid';
import BusNavbar from '@components/bus/Navbar';
import Layout from '@components/common/Layout';
import { useRouter } from 'next/router';
import { arrayFormat } from '@helpers/array-format';
import Loader from '@components/common/Loader';

export default function Orders() {
  const router = useRouter();
  const { startLocation, stopLocation, endLocation, date } = router.query;
  const { data } = useQuery(BUS_ALL_LOCATIONS_QUERY);

  console.log(date);

  const {
    data: scheduleData,
    loading,
    error,
  } = useQuery(BUS_ALL_SCHEDULES_QUERY, {
    variables: {
      startLocation: startLocation ? startLocation : '',
      stopLocation: stopLocation ? stopLocation : '',
      locationEnd: endLocation ? endLocation : '',
      leaveDate: date ? date + ',' + date : '',
    },
  });

  if (error) return `Error! ${error.message}`;

  const scheduleResult =
    scheduleData === undefined ? '' : scheduleData.busAllSchedules.edges;
  const startLocations = arrayFormat(data);

  return (
    <Layout>
      <div className=" bg-bg">
        <BusNavbar navbarData={NavData} startLocations={startLocations} />
        <div className="max-w-7xl mx-auto my-5 grid grid-cols-1 lg:grid-cols-3">
          <div className="md:col-span-2 space-y-5">
            <div className="px-2">
              <div className="bg-alert border border-alert h-auto flex items-center rounded-2xl space-x-5 px-2">
                <ShieldExclamationIcon className="w-7 h-7 ml-2 lg:ml-12 text-alert flex-shrink-0" />
                <p className="text-alert font-bold text-md md:text-lg py-3">
                  Хамгийн сүүлийн үеийн COVID-19 аяллын мэдээллийг эндээс үзнэ
                  үү
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
                title="Уучлаарай"
                subTitle="Энэ хайлтад тохирох үр дүн олдсонгүй. Дахин оролдоно уу?"
                // extra={<Button type="primary">Дахин оролдох</Button>}
              />
            )}
          </div>
          <div className="hidden lg:block">
            {/* <div className="sticky top-0 bg-white py-5 px-5 rounded-xl divide-y-2"> */}
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
