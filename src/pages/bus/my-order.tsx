import NavData from '@data/navData.json';
import React, { FC, useState } from 'react';
import TravelList from '@data/getTravelList.json';
import TravelData from '@data/getTravelData.json';
import Footer from '@components/common/Footer';
import Navbar3 from '@components/common/Navbar/Navbar3';
import {
  ArrowRightIcon,
  LocationMarkerIcon,
  ClockIcon,
  CalendarIcon,
  CreditCardIcon,
} from '@heroicons/react/solid';
import { Table, Tag, Space } from 'antd';

export default function myOrders() {
  const dataSource = [
    {
      key: '1',
      start_location: TravelList[0].start_location,
      end_location: TravelList[0].end_location,
      start_date: TravelList[0].start_date,
      end_date: TravelList[0].end_date,
      pass_num: 1,
      seat_num: '15',
      payment_total: TravelList[0].price,
    },
    {
      key: '2',
      start_location: TravelList[1].start_location,
      end_location: TravelList[1].end_location,
      start_date: TravelList[1].start_date,
      end_date: TravelList[1].end_date,
      pass_num: 1,
      seat_num: '25',
      payment_total: TravelList[1].price,
    },
  ];

  const columns = [
    {
      title: 'Эхлэх цэг',
      dataIndex: 'start_location',
      key: 'start_location',
    },
    {
      title: 'Очих цэг',
      dataIndex: 'end_location',
      key: 'end_location',
    },
    {
      title: 'Хөдлөх цаг',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Хүрэх цаг',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Зорчигчидийн тоо',
      dataIndex: 'pass_num',
      key: 'pass_num',
    },
    {
      title: 'Суудлын дугаар',
      dataIndex: 'seat_num',
      key: 'seat_num',
    },
    {
      title: 'Төлбөрийн нийт дүн',
      dataIndex: 'payment_total',
      key: 'payment_total',
    },
  ];
  return (
    <div className=" bg-bg">
      <Navbar3 navbarData={NavData} />

      <div className="max-w-7xl mx-auto text-cardDate my-5 w-full">
        <div>
          <Table
            className="text-cardDate text-sm font-bold"
            dataSource={dataSource}
            columns={columns}
          />
        </div>
        {/* <div className="bg-white space-y-6 rounded-lg shadow-md py-4">
          <p className="flex text-lg text-cardDate font-bold justify-center">
            {TravelList[0].start_location}
            <h1 className="text-red-400 px-2">-аас </h1>
            {TravelList[0].end_location}
          </p>
          <p className="flex text-lg text-cardDate font-bold justify-center">
            {TravelList[0].start_date}
            <ArrowRightIcon className="h-7 text-direction px-4" />
            <h1 className="text-cardDate text-base font-medium">
              {TravelList[0].date}, {TravelList[0].is_start_stop} зогсолт
            </h1>
            <ArrowRightIcon className="h-7 text-direction px-4" />
            {TravelList[0].end_date}
          </p>

          <div className=" flex justify-center text-cardDate text-base">
            <table className="table-auto border-2 border-gray-400 w-1/2">
              <tr className="border-b-2 border-gray-400">
                <th className="text-xl py-2">Захиалгын мэдээлэл</th>
              </tr>
              <tr className="border-b-2 border-gray-400">
                <td className="py-2 pl-4">Эхлэх цэг</td>
                <td className="font-medium py-2 pl-4">
                  {TravelList[0].start_location}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-400">
                <td className="py-2 pl-4">Очих цэг</td>
                <td className="font-medium py-2 pl-4">
                  {TravelList[0].end_location}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-400">
                <td className="py-2 pl-4">Хөдлөх цаг</td>
                <td className="font-medium py-2 pl-4">
                  {TravelList[0].start_date}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-400">
                <td className="py-2 pl-4">Хүрэх цаг</td>
                <td className="font-medium py-2 pl-4">
                  {TravelList[0].end_date}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-400">
                <td className="py-2 pl-4">Зорчигчидийн тоо</td>
                <td className="font-medium py-2 pl-4">2</td>
              </tr>
              <tr className="border-b-2 border-gray-400">
                <td className="py-2 pl-4">Суудлын дугаар</td>
                <td className="font-medium py-2 pl-4">1, 8</td>
              </tr>
              <tr className="">
                <td className="py-2 pl-4">Төлбөрийн нийт дүн</td>
                <td className="font-medium py-2 pl-4">{TravelList[0].price}</td>
              </tr>
            </table>
          </div>
        </div> */}
      </div>
      <Footer navbarData={NavData} />
    </div>
  );
}
{
  /* <div className="max-w-7xl mx-auto text-cardDate my-5 grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 pr-4">
          <div className="bg-white space-y-6 rounded-lg shadow-md space-y-4">
            <h1 className="text-2xl text-cardDate py-4 px-8 font-bold border-b-2">
              Захиалгын мэдээлэл
            </h1>
            <div className="text-base space-y-6 px-8 pb-6">
              <div className="space-y-4">
                <p className="flex font-bold items-center">
                  <LocationMarkerIcon className="h-7 text-direction pr-4" />
                  {TravelList[0].start_location}
                  <h1 className="text-red-400 px-2">-аас </h1>
                  {TravelList[0].end_location}
                </p>
                <p className="flex font-bold text-xl items-center">
                  <ClockIcon className="h-7 text-direction pr-4" />
                  {TravelList[0].start_date}
                  <ArrowRightIcon className="h-7 text-direction px-4" />
                  <h1 className="text-cardDate text-base font-medium">
                    {TravelList[0].date}, {TravelList[0].is_start_stop} зогсолт
                  </h1>
                  <ArrowRightIcon className="h-7 text-direction px-4" />
                  {TravelList[0].end_date}
                </p>
              </div>
              <div className="text-lg font-medium space-y-4">
                <p className="flex">
                  <CalendarIcon className="h-7 text-direction pr-4" />
                  Захиалга хийсэн огноо:{TravelList[0].order_date}
                </p>
                <p className="flex">
                  <CalendarIcon className="h-7 text-direction pr-4" />
                  Суудлын дугаар: 1, 8
                </p>
                <p className="flex">
                  <CreditCardIcon className="h-7 text-direction pr-4" />
                  Төлбөр төлөгдсөн эсэх: Төлөгдсөн
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white space-y-6 rounded-lg shadow-md space-y-4">
            <h1 className="text-2xl text-cardDate py-4 px-8 font-bold border-b-2">
              Зорчигчийн мэдээлэл
            </h1>
            <div className="text-base space-y-6 px-8 pb-6"></div>
          </div>
        </div>
        <div className="pl-4">
          <div className="bg-white space-y-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-cardDate py-4 px-8 font-bold border-b-2">
              Автобусны мэдээлэл
            </h1>
            <div className="pl-8 text-lg text-cardDate font-medium">
              <ul className="w-full space-y-2 pb-4">
                <li className="flex">
                  ААН:
                  <p className="font-bold pl-2">
                    {TravelData.insurance.company_name}
                  </p>
                </li>
                <li className="flex">
                  Марк загвар:
                  <p className="font-bold pl-2">{TravelData.bus.model_name}</p>
                </li>
                <li className="flex">
                  Улсын дугаар:
                  <p className="font-bold pl-2">
                    {TravelData.bus.plate_number}
                  </p>
                </li>
                <li className="flex">
                  Жолооч:
                  <p className="font-bold pl-2">{TravelData.driver.name}</p>
                </li>
                <li className="flex">
                  Утасны дугаар:
                  <p className="font-bold pl-2">{TravelData.driver.phone}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */
}
