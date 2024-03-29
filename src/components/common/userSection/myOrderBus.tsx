import { useQuery } from '@apollo/client';
import { useTrainContext } from '@context/trainContext';
import { MY_BOOKING_LIST_QUERY } from '@graphql/queries';
import { bookingListFormat, unixDate } from '@helpers/array-format';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';

export default function MyOrdersBus() {
  const { t } = useTranslation();
  const [isActive1, setIsActive1] = useState(false);
  const { data } = useQuery(MY_BOOKING_LIST_QUERY);
  const bookingData = data && bookingListFormat(data);
  const { setMyOrderId } = useTrainContext();

  const setType = id => {
    setMyOrderId(id);
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="text-cardDate text-lg font-semibold">{t('bus')}</h1>

          <div
            className="flex items-center gap-x-2 hover:bg-blue-500 hover:text-white hover:rounded p-2 cursor-pointer"
            onClick={() => setType(0)}
          >
            <ArrowLeftIcon className="w-3 h-3" />
            <button className="text-xs font-semibold">Буцах</button>
          </div>
        </div>
        {bookingData &&
          bookingData?.map((item: any, index: number) => (
            <div key={index}>
              <div className="hidden">{unixDate(item?.node?.schedule)}</div>
              <hr className="my-4" />
              <div className="rounded border p-2 space-y-2">
                <div className="flex justify-between flex-wrap items-center">
                  <h1 className="text-cardDate ">
                    {t('dateOrder')}:{' '}
                    <b>
                      {moment(item?.node?.createdAt).format('YYYY-MM-DD HH:mm')}
                    </b>
                  </h1>
                  <h1 className="font-medium text-cardDate text-center">
                    {t('seatNumber')}:{' '}
                    {item?.node?.pax?.map(z => z.seat).join(', ')}
                  </h1>
                  <div className="flex items-center gap-x-2">
                    <h1
                      className={`font-medium text-xs bg-red-400 text-white p-2 rounded ${
                        item?.node?.status === 7
                          ? 'bg-red-400'
                          : item?.node?.status === 4
                          ? 'bg-green-400'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {item?.node?.statusName}
                    </h1>
                    <button className="font-medium text-xs text-white p-2 rounded bg-blue-400">
                      <CurrencyFormat
                        value={item?.node?.toPay}
                        displayType={'text'}
                        thousandSeparator={true}
                        renderText={value => <div>{value} MNT</div>}
                      />
                    </button>
                  </div>
                </div>
                <div className="bg-myOrders p-2 rounded">
                  <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-base border-b-2 border-white border-dotted pb-2">
                    <div className="flex items-center justify-center font-medium text-orders">
                      <p>
                        {
                          item?.node?.schedule?.locationEnd?.locationStop
                            ?.location?.name
                        }{' '}
                        /{item?.node?.schedule?.startStopName}/
                      </p>
                      <ArrowRightIcon className="md:w-4 md:h-4 w-3 h-3 text-orders mx-2" />

                      <p>
                        {
                          item?.node?.schedule?.locationEnd?.locationEnd
                            ?.location?.name
                        }{' '}
                        /{item?.node?.schedule?.endStopName}/
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center flex-wrap justify-center xs:justify-between py-2 gap-3">
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <h1 className="flex flex-wrap text-cardDate font-medium gap-1">
                        {item?.node?.schedule?.leaveDate}
                        <p> {item?.node?.schedule?.leaveTime.slice(0, 5)}</p>
                      </h1>
                      <h1 className="font-bold">-</h1>
                      <h1 className="text-cardDate">
                        {item?.node?.schedule?.locationEnd?.distance}
                        {t('measurement')}
                      </h1>
                      <h1 className="font-bold">-</h1>
                      <h1 className="flex flex-wrap text-orders font-medium gap-1">
                        {moment
                          .unix(unixDate(item?.node?.schedule))
                          .format('YYYY-MM-DD')}{' '}
                        <p>
                          {moment
                            .unix(unixDate(item?.node?.schedule))
                            .format('HH:mm')}
                        </p>
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
                          {t('businessFirms')}:{' '}
                          {item?.node?.schedule?.insurance?.name}
                        </h1>
                        <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                          {t('busModel')}:{' '}
                          {item?.node?.schedule?.bus?.modelName}
                        </h1>
                      </div>
                      <div className="space-y-3">
                        <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                          {t('busNumber')}:{' '}
                          {item?.node?.schedule?.bus?.plateNumber}
                        </h1>
                        <h1 className="text-cardDate font-medium text-xs sm:text-sm">
                          {t('driverPhoneNumber')}:{' '}
                          {item?.node?.schedule?.driverPhone}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
