import { useTranslation } from 'next-i18next';
import {
  ArrowRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { MY_BOOKING_LIST_QUERY } from '@graphql/queries';
import { bookingListFormat } from '@helpers/array-format';

export default function MyOrders() {
  const { t } = useTranslation();
  const [isActive1, setIsActive1] = useState(false);

  const { data, loading, error } = useQuery(MY_BOOKING_LIST_QUERY);
  if (error) return `Error! ${error.message}`;
  const bookingData = data && bookingListFormat(data);
  console.log(bookingData);
  //setBookingList(bookingData);

  return (
    <div>
      <h1 className="text-cardDate text-lg font-medium">{t('bus')}</h1>
      {bookingData &&
        bookingData.map((item, index) => (
          <div key={index}>
            <hr className="my-4" />
            <div className="rounded-lg border p-2 space-y-2">
              <div className="flex justify-between flex-wrap items-center">
                <h1 className="text-cardDate ">
                  {t('dateOrder')}: <b>{'YYYY-MM-DD HH:mm'}</b>
                </h1>
                <h1 className="font-medium text-cardDate text-center">
                  {t('seatNumber')}: {'7'}
                </h1>
                <h1
                  className={`font-medium text-xs bg-red-600 text-white py-1 px-2 rounded`}
                >
                  {'Цуцлагдсан'}
                </h1>
              </div>
              <div className="bg-myOrders p-2 rounded-lg">
                <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-base border-b-2 border-white border-dotted pb-2">
                  <div className="flex items-center justify-center font-medium text-orders">
                    <p>
                      {'Улаанбаатар'} /{'Сонгинохайрхан'}/
                    </p>
                    <ArrowRightIcon className="md:w-4 md:h-4 w-3 h-3 text-orders mx-2" />

                    <p>
                      {'Ховд'} /{'Жаргалант'}/
                    </p>
                  </div>
                  <p className="text-black font-normal">178000{' MNT'}</p>
                </div>
                <div className="flex items-center flex-wrap justify-center xs:justify-between py-2 gap-3">
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <h1 className="flex flex-wrap text-cardDate font-medium gap-1">
                      {'2021-12-08'}
                      <p> {' 13:00'}</p>
                    </h1>
                    <h1 className="font-bold">-</h1>
                    <h1 className="text-cardDate">
                      {1500}
                      {t('measurement')}
                    </h1>
                    <h1 className="font-bold">-</h1>
                    <h1 className="flex flex-wrap text-orders font-medium gap-1">
                      {'2021-12-09'} <p>{'14:00'}</p>
                    </h1>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="text-orders font-medium flex text-xs md:text-sm"
                      onClick={() => setIsActive1(!isActive1)}
                    >
                      {t('busInformation')}
                      {isActive1 ? (
                        <ChevronUpIcon className="md:w-6 md:h-6 w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="md:w-6 md:h-6 w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className={`${!isActive1 ? 'hidden' : 'block'}`}>
                  <div className="border-t-2 border-white border-dotted px-3 md:px-6 flex flex-col xs:flex-row justify-around py-5 space-y-3 xs:space-y-0">
                    <div className="space-y-3">
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        {t('businessFirms')}: {'Business company'}
                      </h1>
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        {t('busModel')}: {'Bus model'}
                      </h1>
                    </div>
                    <div className="space-y-3">
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        {t('busModel')}: {'Bus model'}
                      </h1>
                      <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                        {t('driverPhoneNumber')}: {'Bus model'}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
