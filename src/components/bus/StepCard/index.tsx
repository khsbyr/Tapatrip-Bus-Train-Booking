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
import moment from 'moment';
import { arrayFilterSchedule } from '@helpers/array-format';
import { unixDate } from '@helpers/array-format';
import CurrencyFormat from 'react-currency-format';

const { Step } = Steps;
export default function StepCard({ datas, scheduleId }) {
  console.log(datas);
  const unixDates = unixDate(datas);
  const { selectedSeats } = useGlobalStore();
  const [isActive, setIsActive] = useState(false);
  let format = n =>
    `0${(n / 60) ^ 0}`.slice(-2) +
    ' цаг ' +
    ('0' + (n % 60)).slice(-2) +
    ' минут';
  const formatSelectedSeats = arrayFilterSchedule(selectedSeats, scheduleId);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className={style.card}>
          <div className="px-3 md:px-6 space-y-2 lg:space-y-4">
            <div className="flex flex-wrap justify-between pt-5">
              <div className="mb-4 sm:mb-0 space-y-0 sm:space-y-2">
                <div className="flex space-x-8 items-center">
                  <div className="">
                    <h1 className={style.startTitle}>{datas.leaveDate}</h1>
                    <h1 className={style.timeText}>
                      {datas.leaveTime.slice(0, 5)}
                    </h1>
                  </div>
                  <div>
                    <p className="flex justify-center">
                      <ArrowRightIcon className="h-5 text-direction" />
                    </p>
                    <h1 className={style.timeText}>
                      {datas.locationEnd.distance}
                      {' км'}
                    </h1>
                  </div>
                  <div className="">
                    <h1 className={style.startTitle}>
                      {moment.unix(unixDates).format('YYYY-MM-DD')}
                    </h1>
                    <h1 className="flex justify-end font-light text-cardDate text-xs">
                      {moment.unix(unixDates).format('HH:mm')}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="space-y-1 lg:space-y-2">
                <h1 className={style.priceText}>
                  <h1 className="flex text-cardDate font-bold text-sm sm:text-base lg:text-sm space-x-2">
                    <CurrencyFormat
                      value={
                        formatSelectedSeats.length > 0
                          ? datas.adultTicket * formatSelectedSeats.length
                          : datas.adultTicket
                      }
                      displayType={'text'}
                      thousandSeparator={true}
                      renderText={value => <div>{value}</div>}
                    />
                    <h1 className={style.priceText}>{' MNT'}</h1>
                  </h1>
                </h1>
                <h1 className="flex items-center text-xs md:text-sm lg:text-base">
                  <UserIcon className="w-3 md:w-4 h-3 md:h-4 " />
                  {formatSelectedSeats.length > 0
                    ? formatSelectedSeats.length
                    : 1}{' '}
                  зорчигчийн үнэ
                </h1>
              </div>
            </div>
            <h1 className="flex text-sm text-cardDate">
              {format(datas.locationEnd.estimatedDuration)}
            </h1>
            <div className="flex items-center pt-4 sm:pt-4">
              <div className={style.rightRound}></div>
              <div className="bg-bg w-full h-0.5 "></div>
              <div className={style.leftRound}></div>
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
                    <ChevronUpIcon className="md:w-6 md:h-6 w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="md:w-6 md:h-6 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className={`${!isActive ? 'hidden' : 'block'}`}>
            <div className="border border-dashed"></div>
            <div className="px-5 lg:px-20 py-5">
              <Steps progressDot direction="vertical">
                <Step
                  title={datas.leaveDate}
                  description={
                    datas.startStopName +
                    ' /' +
                    datas.locationEnd.locationStop.location.name +
                    '/'
                  }
                />
                <Step
                  title={moment.unix(unixDates).format('YYYY-MM-DD')}
                  description={
                    datas.locationEnd.locationEnd.name +
                    ' /' +
                    datas.locationEnd.locationEnd.location.name +
                    '/'
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
