import { Input, Modal, Select } from 'antd';
import React, { useState, FC } from 'react';
import ContentWrapper from './style';
import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import Image from 'next/image';
import TravelList from '@data/getTravelList[1].json';
import TravelData from '@data/getTravelData.json';

import Card2 from '@components/bus/Card/Card2';
import { ArrowRightIcon } from '@heroicons/react/solid';
const countries = [
  { name: '+976', src: mngIcon, value: 0 },
  { name: '+44', src: enIcon, value: 1 },
];
const { Option } = Select;
interface Props {
  isModalVisible?: any;
  close?: any;
}

const OrderModal: FC<Props> = props => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Modal
      // title="Захиалгийн мэдээлэл шалгах"
      okText=" "
      cancelText="Буцах"
      visible={props.isModalVisible}
      onCancel={() => props.close()}
      width={700}
    >
      <ContentWrapper>
        <div className="space-y-4">
          <h1 className="text-cardDate text-xl font-bold border-b-2 pb-2">
            Захиалгын мэдээлэл шалгах
          </h1>
          <div className="flex justify-center">
            <div className="w-1/2 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-cardDate text-base px-2 font-medium"
                  htmlFor=""
                >
                  Захиалгын дугаар
                </label>
                <Input
                  className="rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-base"
                  placeholder="Захиалгын дугаар оруулна уу"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-cardDate text-base px-2 font-medium"
                  htmlFor=""
                >
                  Утас дугаар
                </label>
                <div className="flex rounded-lg bg-bg">
                  <Select
                    defaultValue={countries[0].value}
                    className="w-48 text-sm border-r-2 p-2 mx-2 text-cardDate"
                  >
                    {countries.map(country => (
                      <Option value={country.value}>
                        <p className="h-full w-full">
                          <Image
                            src={country.src}
                            width="24"
                            height="12"
                            className="rounded-sm"
                          />{' '}
                          {country.name}
                        </p>
                      </Option>
                    ))}
                  </Select>
                  <Input
                    className="rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-base"
                    placeholder="Утасы дугаар оруулна уу"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-cardDate text-base px-2 font-medium"
                  htmlFor=""
                >
                  Баталгаажуулах
                </label>
                <p className="flex rounded-lg bg-bg border-0">
                  <Input
                    className="w-2/3 py-3 bg-bg border-0 border-r-2 rounded-l-lg text-cardDate text-base"
                    placeholder="6 оронтой код оруулна уу"
                  />
                  <button
                    className="text-cardDate font-medium w-1/3"
                    onClick={() => setIsActive(!isActive)}
                  >
                    CMC код илгээх
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className={`${!isActive ? 'hidden' : 'block grid grid-cols-2'}`}>
            <div className="text-sm font-medium text-cardDate">
              <h1 className="flex justify-center text-cardDate text-xl font-bold pb-4 border-b-2">
                Захиалгын мэдээлэл
              </h1>
              <div className="border-r-2 space-y-3 py-2 pr-2">
                <p className="space-y-1">
                  <p className="flex font-bold justify-between">
                    {TravelList[0].start_location}
                    <h1 className="text-red-400">-аас </h1>
                    {TravelList[0].end_location}
                  </p>
                  <p className="flex font-bold text-lg justify-between">
                    {TravelList[0].start_date}
                    <ArrowRightIcon className="h-7 text-direction" />
                    {TravelList[0].end_date}
                  </p>
                  {TravelList[0].date}, {TravelList[0].is_start_stop} зогсолт
                </p>

                <p className="text-base space-y-2">
                  <p>Захиалга хийсэн огноо:{TravelList[0].order_date}</p>
                  <p>Суудлын дугаар: 1, 8</p>
                  <p>Төлбөр төлөгдсөн эсэх: Төлөгдсөн</p>
                </p>
              </div>
            </div>
            <div>
              <h1 className="flex justify-center text-cardDate text-xl font-bold pb-4 border-b-2">
                Автобусны мэдээлэл
              </h1>
              <div className="pl-6 py-2 text-base text-cardDate font-medium">
                <ul className="w-full space-y-2">
                  <li className="flex">
                    ААН:
                    <p className="font-bold pl-2">
                      {TravelData.insurance.company_name}
                    </p>
                  </li>
                  <li className="flex">
                    Марк загвар:
                    <p className="font-bold pl-2">
                      {TravelData.bus.model_name}
                    </p>
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
        </div>
      </ContentWrapper>
    </Modal>
  );
};

export default OrderModal;
