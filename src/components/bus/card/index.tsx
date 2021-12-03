import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Steps } from 'antd';
import style from './card.module.scss';
import Link from 'next/link';
import { unixDate } from '@helpers/array-format';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import { useTranslation } from 'next-i18next';

const { Step } = Steps;

export default function Card({ datas }) {
  const { t } = useTranslation(['order']);
  const unixDates = unixDate(datas.node);
  console.log(datas?.node);
  const [isActive, setIsActive] = useState(false);
  const format = n =>
    `0${(n / 60) ^ 0}`.slice(-2) +
    ' ' +
    t('orderHours') +
    ' ' +
    ('0' + (n % 60)).slice(-2) +
    ' ' +
    t('orderMinutes');

  return (
    <div className="px-2">
      <div className="max-w-7xl mx-auto">
        <div className={style.card}>
          <div className="px-7 md:px-12 space-y-2 lg:space-y-4">
            <div className="flex justify-between flex-wrap pt-5">
              <div className="mb-4 sm:mb-0 space-y-0 sm:space-y-2">
                <div className="flex space-x-4 items-center">
                  <div className="">
                    <h1 className={style.startTitle}>
                      {datas?.node.leaveDate}
                    </h1>
                    <h1 className={style.timeText}>
                      {datas?.node.leaveTime.slice(0, 5)}
                    </h1>
                  </div>
                  <div>
                    <p
                      className={
                        datas?.node?.locationEnd?.estimatedDuration === 0
                          ? 'hidden'
                          : 'block flex justify-center'
                      }
                    >
                      <ArrowRightIcon className="h-5 text-direction" />
                    </p>
                    <h1
                      className={`${
                        datas?.node.locationEnd.distance === 0
                          ? 'hidden'
                          : style.timeText
                      }`}
                    >
                      <div className="flex items-center">
                        <CurrencyFormat
                          value={datas?.node.locationEnd.distance}
                          displayType={'text'}
                          thousandSeparator={true}
                          renderText={value => <div>{value}</div>}
                        />
                        {t('measurement')}
                      </div>
                    </h1>
                  </div>

                  <div
                    className={
                      datas?.node?.locationEnd?.estimatedDuration === 0
                        ? 'hidden'
                        : 'block'
                    }
                  >
                    <h1 className={style.startTitle}>
                      {moment.unix(unixDates).format('YYYY-MM-DD')}
                    </h1>
                    <h1 className="flex justify-end font-light text-cardDate text-xs md:text-sm lg:text-lg">
                      {moment.unix(unixDates).format('hh:mm')}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="hidden xs:block space-y-1 lg:space-y-2">
                <div className="flex text-cardDate font-bold text-sm md:text-lg lg:text-2xl space-x-2">
                  <CurrencyFormat
                    value={datas.node.adultTicket}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => <div>{value}</div>}
                  />
                  <h1 className={style.priceText}>{' MNT'}</h1>
                </div>
                <h1 className="flex items-center text-xs md:text-sm lg:text-base">
                  <UserIcon className="w-3 md:w-4 h-3 md:h-4 " /> 1{' '}
                  {t('passengerPrice')}
                </h1>
              </div>
            </div>

            <div className="flex justify-between">
              <h1
                className={`${
                  datas?.node.locationEnd.distance === 0
                    ? 'hidden'
                    : 'flex text-sm text-cardDate items-center xs:items-start'
                }`}
              >
                {format(datas?.node.locationEnd.estimatedDuration)}
              </h1>
              <div className="xs:hidden space-y-1 lg:space-y-2">
                <div className="flex text-cardDate font-bold text-sm md:text-lg lg:text-2xl space-x-2">
                  <CurrencyFormat
                    value={datas.node.adultTicket}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => <div>{value}</div>}
                  />
                  <h1 className={style.priceText}>{' MNT'}</h1>
                </div>
                <h1 className="flex items-center text-xs md:text-sm lg:text-base">
                  <UserIcon className="w-3 md:w-4 h-3 md:h-4 " /> 1{' '}
                  {t('passengerPrice')}
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
                  {t('directionInformation')}
                  {isActive ? (
                    <ChevronUpIcon className="md:w-6 md:h-6 w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="md:w-6 md:h-6 w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="col-span-2 mt-5 lg:mt-0 lg:col-span-1">
                <Link href={`/bus/orders/${datas?.node.id}`}>
                  <button className={style.orderButton}>
                    {t('orderButton')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className={`${!isActive ? 'hidden' : 'block'}`}>
            <div className="border border-dashed "></div>
            <div className="px-5 lg:px-20 py-5 grid sm:grid-cols-2">
              <Steps progressDot direction="vertical" className="col-span-1">
                <Step
                  title={datas.node.leaveDate}
                  description={
                    datas?.node.startStopName +
                    ' /' +
                    datas?.node.locationEnd.locationStop.location.name +
                    '/'
                  }
                />
                <Step
                  title={moment.unix(unixDates).format('YYYY-MM-DD')}
                  description={
                    datas?.node.locationEnd.locationEnd.name +
                    ' /' +
                    datas?.node.locationEnd.locationEnd.location.name +
                    '/'
                  }
                />
              </Steps>
              <div className="w-full col-span-1 flex items-end md:justify-end font-medium text-sm sm:text-base text-cardDate lg:ml-12">
                <h1 className="text-sm sm:text-base text-cardDate font-normal pr-2">
                  {t('insuranceCompany')}:
                </h1>
                <p>{datas?.node.insurance.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
