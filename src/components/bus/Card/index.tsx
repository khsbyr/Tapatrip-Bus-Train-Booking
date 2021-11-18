import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Steps } from 'antd';
import style from './Card.module.scss';
import Link from 'next/link';
import { unixDate } from '@helpers/array-format';
import moment from 'moment';

const { Step } = Steps;

export default function Card({ datas }) {
  const unixDates = unixDate(datas.node);
  const [isActive, setIsActive] = useState(false);
  let format = n =>
    `0${(n / 60) ^ 0}`.slice(-2) +
    ' цаг ' +
    ('0' + (n % 60)).slice(-2) +
    ' минут';
  return (
    <div className="px-2">
      <div className="max-w-7xl mx-auto">
        <div className={style.card}>
          <div className="px-7 md:px-12 space-y-2 lg:space-y-4">
            <h1 className={style.leaveTitle}>{datas.node.leaveDate}</h1>
            <div className="flex justify-between flex-wrap">
              <div className="mb-4 sm:mb-0 space-y-0 sm:space-y-2">
                <div className="flex space-x-4 items-center">
                  <div className="">
                    <h1 className={style.startTitle}>{datas.node.leaveDate}</h1>
                    <h1 className={style.timeText}>
                      {datas.node.leaveTime.slice(0, 5)}
                    </h1>
                  </div>
                  <div>
                    <p className="flex justify-center">
                      <ArrowRightIcon className="h-5 text-direction" />
                    </p>
                    <h1
                      className={`${
                        datas.node.locationEnd.distance === 0
                          ? 'hidden'
                          : style.timeText
                      }`}
                    >
                      {datas.node.locationEnd.distance}
                      {' км'}
                    </h1>
                  </div>
                  <div className="">
                    <h1 className={style.startTitle}>
                      {moment.unix(unixDates).format('YYYY-MM-DD')}
                    </h1>
                    <h1 className={style.timeText}>
                      {moment.unix(unixDates).format('HH:mm')}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="hidden xs:block space-y-1 lg:space-y-2">
                <h1 className={style.priceText}>
                  {datas.node.adultTicket} MNT
                </h1>
                <h1 className="flex items-center text-xs md:text-sm lg:text-base">
                  <UserIcon className="w-3 md:w-4 h-3 md:h-4 " /> 1 зорчигчийн
                  үнэ
                </h1>
              </div>
            </div>

            <div className="flex justify-between">
              <h1
                className={`${
                  datas.node.locationEnd.distance === 0
                    ? 'hidden'
                    : 'flex text-sm text-cardDate items-center xs:items-start'
                }`}
              >
                {format(datas.node.locationEnd.estimatedDuration)}
              </h1>
              <div className="xs:hidden space-y-1 lg:space-y-2">
                <h1 className={style.priceText}>
                  {datas.node.adultTicket} MNT
                </h1>
                <h1 className="flex items-center text-xs md:text-sm lg:text-base">
                  <UserIcon className="w-3 md:w-4 h-3 md:h-4 " /> 1 зорчигчийн
                  үнэ
                </h1>
              </div>
            </div>
            <div className="flex items-center pt-4 sm:pt-4">
              <div className={style.rightRound}></div>
              <div className="bg-bg w-full h-0.5"></div>
              <div className={style.leftRound}></div>
            </div>
            <div className={style.rowDirection}>
              <div>
                <h1 className="text-cardDate font-semibold text-xs md:text-sm lg:text-md">
                  {datas.node.directionName}
                </h1>
              </div>
              <div className="flex items-center space-x-8 justify-center">
                <button
                  className="text-direction font-medium flex text-xs md:text-base"
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
              <div className="col-span-2 mt-5 lg:mt-0 lg:col-span-1">
                <Link href={`/bus/orders/${datas.node.id}`}>
                  <button className={style.orderButton}>Захиалах</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={`${!isActive ? 'hidden' : 'block'}`}>
            <div className="border border-dashed "></div>
            <div className="px-5 lg:px-20 py-5">
              <Steps progressDot direction="vertical">
                <Step
                  title={datas.node.leaveDate}
                  description={
                    datas.node.startStopName +
                    '-' +
                    datas.node.locationEnd.locationStop.location.name
                  }
                />
                <Step
                  title={moment.unix(unixDates).format('YYYY-MM-DD')}
                  description={
                    datas.node.locationEnd.locationEnd.name +
                    '-' +
                    datas.node.locationEnd.locationEnd.location.name
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
