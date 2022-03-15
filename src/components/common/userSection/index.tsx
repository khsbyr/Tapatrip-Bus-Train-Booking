import { useTranslation } from 'next-i18next';
import {
  ArrowRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { MY_BOOKING_LIST_QUERY } from '@graphql/queries';
import { bookingListFormat } from '@helpers/array-format';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import { unixDate } from '@helpers/array-format';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import TrainService from '@services/train';
import { useTrainContext } from '@context/trainContext';
import Loader from '../../train/loader';

export default function MyOrdersAll() {
  const { t } = useTranslation();
  const [isActive1, setIsActive1] = useState(false);
  const { data } = useQuery(MY_BOOKING_LIST_QUERY);
  const bookingData = data && bookingListFormat(data);
  const [trainData, setTrainData] = useState([]);
  const { setMyOrderId } = useTrainContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getOrderTrain() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : '';
      if (token) {
        try {
          const res = await TrainService.getMyOrder(token);
          if (res && res.status === 200) {
            setTrainData(res.result);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    }
    getOrderTrain();
  }, []);

  const getStatusName = status => {
    switch (status) {
      case 1:
        return 'Төлбөр хүлээж байгаа';
      case 2:
        return 'Төлөгдсөн';
      case 3:
        return 'Тийз бичигдсэж байна';
      case 4:
        return 'Захиалга Амжилттай';
      case 5:
        return 'Өдөр сольсон';
      case 6:
        return 'Цуцалсан';
      case 7:
        return 'Цуцлагдсан';
      case 8:
        return 'Буцаалт хийгдэж байгаа';
      case 9:
        return 'Буцаалт хийгдсэн';
      default:
        return '';
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 1:
        return 'bg-yellow-400';
      case 2:
        return 'bg-green-400';
      case 4:
        return 'bg-green-400';
      case 6:
        return 'bg-red-400';
      case 7:
        return 'bg-red-400';
      default:
        return 'bg-blue-400';
    }
  };

  const setType = id => {
    setMyOrderId(id);
  };

  const getTicket = refNumber => {
    window.open(`https://train.tapatrip.com/train/${refNumber}`, '_blank');
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="text-cardDate text-lg font-semibold">{t('bus')}</h1>

          <div
            className="flex items-center gap-x-2 hover:bg-blue-500 hover:text-white hover:rounded p-2 cursor-pointer"
            onClick={() => setType(1)}
          >
            <button className="text-xs font-semibold">Бүгдийг</button>
            <ArrowRightIcon className="w-3 h-3" />
          </div>
        </div>
        {bookingData &&
          bookingData?.slice(0, 2).map((item: any, index: number) => (
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

      <div className="mt-8">
        <div className="flex justify-between">
          <h1 className="text-cardDate text-lg font-semibold">Галт тэрэг</h1>

          <div
            className="flex items-center gap-x-2 hover:bg-blue-500 hover:text-white hover:rounded p-2 cursor-pointer"
            onClick={() => setType(2)}
          >
            <button className="text-xs font-semibold">Бүгдийг</button>
            <ArrowRightIcon className="w-3 h-3" />
          </div>
        </div>
        {trainData &&
          trainData?.slice(0, 2).map((item: any, index: number) => (
            <div key={index}>
              <hr className="my-4" />
              <div className="rounded border p-2 space-y-2">
                <div className="flex justify-between flex-wrap items-center">
                  <h1 className="text-cardDate ">
                    {t('dateOrder')}:{' '}
                    <b>{moment(item?.created_at).format('YYYY-MM-DD HH:mm')}</b>
                  </h1>
                  <h1 className="font-medium text-cardDate text-center">
                    Вагоны дугаар:{' '}
                    <span className="mr-2">{item?.pax[0]?.wagon_no}</span>
                    {t('seatNumber')}:{' '}
                    {item?.pax?.map(z => z.mest_no).join(', ')}
                  </h1>
                  <div className="flex items-center gap-x-2">
                    <h1
                      className={`font-medium text-xs text-white p-2 rounded ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusName(item.status)}
                    </h1>
                    <div>
                      {item?.status === 4 ? (
                        <button
                          className="font-medium text-xs text-white p-2 rounded bg-blue-400"
                          onClick={() => getTicket(item.ref_number)}
                        >
                          TICKET авах
                        </button>
                      ) : (
                        <button className="font-medium text-xs text-white p-2 rounded bg-blue-400">
                          <CurrencyFormat
                            value={item?.to_pay}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={value => <div>{value} MNT</div>}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-myOrders p-2 rounded">
                  <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-base border-b-2 border-white border-dotted pb-2">
                    <div className="flex items-center justify-center font-medium text-orders">
                      <p>{item.from_name}</p>
                      <ArrowRightIcon className="md:w-4 md:h-4 w-3 h-3 text-orders mx-2" />

                      <p>{item.to_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center flex-wrap justify-center xs:justify-between py-2 gap-3">
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <h1 className="flex flex-wrap text-cardDate font-medium gap-1">
                        {item.dep_date}
                        <p> {item?.dep_time}</p>
                      </h1>
                      <h1 className="font-bold">-</h1>
                      <h1 className="text-cardDate">
                        {item?.miles}
                        {t('measurement')}
                      </h1>
                      <h1 className="font-bold">-</h1>
                      <h1 className="flex flex-wrap text-orders font-medium gap-1">
                        {moment(item?.arr_date).format('YYYY-MM-DD')}{' '}
                        <p>{item.arr_time}</p>
                      </h1>
                    </div>

                    <div>
                      <h1>
                        Захиалгын дугаар:{' '}
                        <span className="font-bold text-orders">
                          {item.ref_number}
                        </span>
                      </h1>
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
