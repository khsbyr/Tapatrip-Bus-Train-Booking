import NavData from '@data/navData.json';
import TravelList from '@data/getTravelList.json';
import React, { FC, useState } from 'react';
import Card from '@components/bus/Card/Card';
import { ShieldExclamationIcon } from '@heroicons/react/solid';
import Footer from '@components/common/Footer';
import Navbar2 from '@components/common/Navbar/Navbar3';
import { Result, Button } from 'antd';
import { SunIcon, CloudIcon, MoonIcon } from '@heroicons/react/outline';
const Orders: FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="bg-bg">
        <Navbar2 navbarData={NavData} />
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
            {TravelList.map(z => (
              <Card
                description={z.description}
                start_date={z.start_date}
                end_date={z.end_date}
                date={z.date}
                price={z.price}
                passengers={z.passengers}
                direction_name={z.direction_name}
                start_location={z.start_location}
                end_location={z.end_location}
                stops={z.stops}
                key={z.id}
              />
            ))}
          </div>
          <div className="relative hidden md:block">
            <div className="fixed bg-white py-5 px-5 rounded-xl divide-y-2">
              <div className="mt-0 space-y-2">
                <h1 className="text-cardDate font-bold text-2xl">Тосох цаг</h1>
                <div className="flex justify-center flex-wrap space-x-4">
                  <div className="rounded shadow-md text-cardDate px-4 py-1">
                    <p className="flex justify-center">
                      <SunIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Өглөө
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </div>
                  <div className="rounded shadow-md text-cardDate px-4 py-1">
                    <p className="flex justify-center">
                      <CloudIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Өдөр
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </div>
                  <div className="rounded shadow-md text-cardDate px-4 py-1">
                    <p className="flex justify-center">
                      <MoonIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Орой
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 space-y-2 ">
                <h1 className="text-cardDate font-bold text-2xl">Тосох цаг</h1>
                <div className="flex justify-center flex-wrap space-x-4">
                  <div className="rounded shadow-md text-cardDate px-4 py-1">
                    <p className="flex justify-center">
                      <SunIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Өглөө
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </div>
                  <div className="rounded shadow-md text-cardDate px-4 py-1">
                    <p className="flex justify-center">
                      <CloudIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Өдөр
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </div>
                  <div className="rounded shadow-md text-cardDate px-4 py-1">
                    <p className="flex justify-center">
                      <MoonIcon className="w-10" />
                    </p>
                    <p className="flex justify-center text-base font-medium">
                      Орой
                    </p>
                    <p className="flex justify-center font-medium">
                      06:00-10:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer navbarData={NavData} />
      </div>
    </>
  );
};

export default Orders;
