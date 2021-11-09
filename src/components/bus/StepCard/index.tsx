import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { Steps } from 'antd';
import { useGlobalStore } from '@context/globalStore';
import style from './StepCard.module.scss';
import Link from 'next/link';

const { Step } = Steps;

export default function StepCard({ datas }) {
  const { selectedSeats } = useGlobalStore();
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className={style.card}>
          <div className="px-5 lg:px-8 space-y-2 lg:space-y-4">
            <h1 className={style.leaveTitle}>{datas.leaveDate}</h1>
            <div className="flex justify-between ">
              <div className="space-y-2">
                <div className="flex space-x-4">
                  <h1 className={style.startTitle}>{datas.leaveDate}</h1>
                  <ArrowRightIcon className="h-6 mt-1 text-direction hidden md:block" />
                  <h1 className="md:hidden">-</h1>
                  <h1 className={style.startTitle}>{datas.leaveDate}</h1>
                </div>
                <h1 className={style.timeText}>{datas.leaveTime}</h1>
              </div>
              <div className="space-y-1 lg:space-y-2">
                <h1 className={style.priceText}>{datas.adultTicket} MNT</h1>
                <h1 className="flex items-center text-xs md:text-sm lg:text-base">
                  <UserIcon className="w-3 md:w-4 h-3 md:h-4 " /> 1 зорчигчийн
                  үнэ
                </h1>
              </div>
            </div>

            <div className={style.rowDirection}>
              <div>
                <h1 className="text-cardDate font-semibold text-xs md:text-sm ">
                  {datas.directionName}
                </h1>
              </div>
              <div className="flex items-center space-x-8">
                <button
                  className="text-direction font-medium flex text-xs md:text-sm"
                  onClick={() => setIsActive(!isActive)}
                >
                  Чиглэлийн мэдээлэл
                  {isActive ? (
                    <ChevronUpIcon className="md:w-6 md:h-6 w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="md:w-6 md:h-6 w-4 h-4" />
                  )}
                </button>
              </div>
              {/* <div className="col-span-2 mt-5 lg:mt-0 lg:col-span-1">
                <Link href={`/bus/orders/${datas.id}`}>
                  <button className={style.orderButton}>Захиалах</button>
                </Link>
              </div> */}
            </div>
          </div>
          {/* <div className={style.rightRound}></div>
          <div className={style.leftRound}></div> */}
          {/* <div className={style.line} style={{ top: '165px' }}></div> */}
          {/* <div className={style.line1} style={{ top: '117px' }}></div>
          <div className={style.line2} style={{ top: '100px' }}></div> */}
          <div className={`${!isActive ? 'hidden' : 'block'}`}>
            <div className="border border-dashed "></div>
            <div className="px-5 lg:px-20 py-5">
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
