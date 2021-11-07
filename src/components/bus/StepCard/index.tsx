import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Steps } from 'antd';
import { useGlobalStore } from '@context/globalStore';

const { Step } = Steps;

export default function StepCard({ datas }) {
  const { selectedSeats } = useGlobalStore();
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="p-2 md:p-0">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-white w-full h-auto rounded-2xl">
          <div className="px-5 space-y-4">
            <div className="flex justify-between">
              <div className="space-y-2 py-5">
                <div className="flex space-x-4">
                  <h1 className="text-cardDate font-bold text-md">
                    {datas.leaveDate}
                  </h1>
                  <ArrowRightIcon className="h-5 text-direction" />
                  <h1 className="text-cardDate font-bold text-md">
                    {datas.leaveDate}
                  </h1>
                </div>
                <h1 className="font-light text-cardDate text-md">
                  {' '}
                  {datas.leaveTime}{' '}
                </h1>
              </div>
              <div className="space-y-2 py-5">
                <h1 className="text-cardDate font-bold text-md">
                  {selectedSeats.length === 0
                    ? datas.adultTicket
                    : datas.adultTicket * selectedSeats.length}{' '}
                  MNT
                </h1>
                <h1 className="flex items-center">
                  <UserIcon className="w-4 h-4 " />
                  {selectedSeats.length === 0 ? 1 : selectedSeats.length}{' '}
                  зорчигчийн үнэ
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap py-5 justify-between items-center ">
              <div>
                <h1 className="text-cardDate font-semibold text-md">
                  {datas.directionName}
                </h1>
              </div>
              <div className="flex items-center space-x-8">
                <button
                  className="text-direction font-medium flex"
                  onClick={() => setIsActive(!isActive)}
                >
                  Чиглэлийн мэдээлэл
                  {isActive ? (
                    <ChevronUpIcon className="w-6 h-6" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="border-4 w-5 h-9 border-r-0 rounded-tl-full rounded-bl-full absolute top-24 right-0 bg-bg border-bg"></div>
          <div className="border-4 w-5 h-9 border-l-0 rounded-tr-full rounded-br-full absolute top-24 left-0 bg-bg border-bg"></div>
          <div
            className="bg-bg w-full h-0.5 absolute"
            style={{ top: '113px' }}
          ></div>
          <div className={`${!isActive ? 'hidden' : 'block'}`}>
            <div className="border border-dashed "></div>
            <div className="px-5 py-5">
              <Steps progressDot direction="vertical">
                <Step
                  title={datas.leaveDate}
                  description={
                    datas.startStopName +
                    '-' +
                    datas.locationEnd.locationStop.location.name
                  }
                />
                <Step
                  title={datas.leaveDate}
                  description={
                    datas.locationEnd.locationEnd.name +
                    '-' +
                    datas.locationEnd.locationEnd.location.name
                  }
                />
              </Steps>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
