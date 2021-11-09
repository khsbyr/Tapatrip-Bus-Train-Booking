import { Input, Modal } from 'antd';
import React, { useState, FC } from 'react';
import TravelList from '@data/getTravelList[1].json';
import TravelData from '@data/getTravelData.json';
import { ArrowRightIcon } from '@heroicons/react/solid';
import InputPhoneNumber from '@components/common/InputPhoneNumber';

interface Props {
  isModalVisible?: any;
  close?: any;
}

export default function OrderModal(props) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <Modal
        visible={props.isModalVisible}
        onCancel={() => props.close()}
        width={700}
        footer={null}
      >
        <div className="space-y-4">
          <h1 className="text-cardDate text-xl font-bold border-b-2 pb-2">
            Захиалгын мэдээлэл шалгах
          </h1>
          <div className="flex justify-center">
            <div className="sm:w-2/3 space-y-4">
              <div className="space-y-3.5">
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
              <InputPhoneNumber />
              <div className="space-y-3.5">
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
          <div
            className={`${
              !isActive ? 'hidden' : 'block grid grid-cols-1 sm:grid-cols-2'
            }`}
          >
            <div className="text-sm font-medium text-cardDate">
              <h1 className="flex justify-center text-cardDate text-xl font-bold pb-4 border-b-2">
                Захиалгын мэдээлэл
              </h1>
              <div className="px-4 py-2 sm:border-r-2 space-y-3">
                <p className="space-y-1">
                  <p className="flex font-bold">
                    {TravelList[0].start_location}
                    <h1 className="text-red-400 px-4 sm:px-8">-аас </h1>
                    {TravelList[0].end_location}
                  </p>
                  <p className="flex font-bold text-lg">
                    {TravelList[0].start_date}
                    <ArrowRightIcon className="px-4 sm:px-10 h-7 text-direction" />
                    {TravelList[0].end_date}
                  </p>
                  {TravelList[0].date}, {TravelList[0].is_start_stop} зогсолт
                </p>

                <p className="text-base space-y-2">
                  <p className="flex">
                    Захиалга хийсэн огноо:
                    <h1 className="px-2 font-bold text-base text-cardDate">
                      2021-09-10 10:59AM
                    </h1>
                  </p>
                  <p className="flex">
                    Суудлын дугаар:
                    <h1 className="px-2 font-bold text-base text-cardDate">
                      1, 8
                    </h1>
                  </p>
                  <p className="flex">
                    Төлбөр төлөгдсөн эсэх:{' '}
                    <h1 className="px-2 font-bold text-base text-cardDate">
                      Төлөгдсөн
                    </h1>
                  </p>
                </p>
              </div>
            </div>
            <div>
              <h1 className="flex justify-center text-cardDate text-xl font-bold pb-4 border-b-2">
                Автобусны мэдээлэл
              </h1>
              <div className="px-4 py-2 text-base text-cardDate font-medium">
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
                    <p className="font-bold pl-2">Жолооч нэр</p>
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
      </Modal>
    </div>
  );
}
