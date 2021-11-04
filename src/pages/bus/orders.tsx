import NavData from '@data/navData.json';
import { useQuery } from '@apollo/client';
import {
  BUS_ALL_LOCATIONS_QUERY,
  BUS_ALL_SCHEDULES_QUERY,
} from '@graphql/queries';
import { SunIcon, CloudIcon, MoonIcon } from '@heroicons/react/outline';
import { Result, Button } from 'antd';
import React, { useState } from 'react';
import Card from '@components/bus/Card';
import { ShieldExclamationIcon } from '@heroicons/react/solid';
import BusNavbar from '@components/bus/Navbar';
import Layout from '@components/common/Layout';
import { useRouter } from 'next/router';
import { arrayFormat } from '@helpers/array-format';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;

export default function Orders() {
  const router = useRouter();
  const { endLocation, date } = router.query;
  const { data } = useQuery(BUS_ALL_LOCATIONS_QUERY);
  const { data: scheduleData, loading } = useQuery(BUS_ALL_SCHEDULES_QUERY, {
    variables: {
      locationEnd: endLocation,
      leaveDate: date ? date + ',' + date : '',
    },
  });

  const scheduleResult =
    scheduleData === undefined ? '' : scheduleData.busAllSchedules.edges;
  const startLocations = arrayFormat(data);
  console.log(scheduleResult);
  return (
    <Layout>
      <div className=" bg-bg">
        <BusNavbar navbarData={NavData} startLocations={startLocations} />
        <div className="max-w-7xl mx-auto my-5 grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 space-y-5">
            <div className="px-2">
              <div className="bg-alert border border-alert h-16 flex items-center rounded-2xl space-x-5 px-2">
                <ShieldExclamationIcon className="w-7 h-7 ml-12 text-alert" />
                <p className="text-alert font-bold text-lg">
                  Хамгийн сүүлийн үеийн COVID-19 аяллын мэдээллийг эндээс үзнэ
                  үү
                </p>
              </div>
            </div>
            {
              <ClipLoader
                color={'#177ad6;'}
                loading={loading}
                css={override}
                speedMultiplier={1}
                size={80}
              />
            }
            {scheduleResult.length > 0 ? (
              scheduleResult.map(schedules => (
                <Card key={schedules.node.id} datas={schedules} />
              ))
            ) : (
              <Result
                status="404"
                title="Уучлаарай"
                subTitle="Энэ хайлтад тохирох үр дүн олдсонгүй"
                extra={<Button type="primary">Дахин оролдох</Button>}
              />
            )}
          </div>
          <div className="hidden md:block">
            <div className="sticky top-0 fixed bg-white py-5 px-5 rounded-xl divide-y-2">
              <div className="mt-0 space-y-2">
                <h1 className="text-cardDate font-bold text-2xl">Тосох цаг</h1>
                <div className="flex justify-center flex-wrap space-x-4">
                  <button className="rounded-xl shadow-md text-cardDate px-4 py-3 border-2 border-white hover:border-weather">
                    <p className="flex justify-center">
                      <SunIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Өглөө
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </button>
                  <button className="rounded-xl shadow-md text-cardDate px-4 py-3 border-2 border-white hover:border-weather">
                    <p className="flex justify-center">
                      <CloudIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Өдөр
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </button>
                  <button className="rounded-xl shadow-md text-cardDate px-4 py-3 border-2 border-white hover:border-weather">
                    <p className="flex justify-center">
                      <MoonIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Орой
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </button>
                </div>
              </div>
              <div className="mt-8 pt-4 space-y-2 ">
                <h1 className="text-cardDate font-bold text-2xl">Хүргэх цаг</h1>
                <div className="flex justify-center flex-wrap space-x-4">
                  <button className="rounded-xl shadow-md text-cardDate px-4 py-3 border-2 border-white hover:border-weather">
                    <p className="flex justify-center">
                      <SunIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Өглөө
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </button>
                  <button className="rounded-xl shadow-md text-cardDate px-4 py-3 border-2 border-white hover:border-weather">
                    <p className="flex justify-center">
                      <CloudIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Өдөр
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </button>
                  <button className="rounded-xl shadow-md text-cardDate px-4 py-3 border-2 border-white hover:border-weather">
                    <p className="flex justify-center">
                      <MoonIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Орой
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
