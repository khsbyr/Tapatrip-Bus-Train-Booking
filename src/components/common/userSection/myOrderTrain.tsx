import { useTrainContext } from '@context/trainContext';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import TrainService from '@services/train';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';

export default function MyOrderTrain() {
  const { t } = useTranslation();
  const [trainData, setTrainData] = useState([]);
  const { setMyOrderId } = useTrainContext();

  useEffect(() => {
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
          }
        } catch (err) {
          console.log(err);
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

  return (
    <>
      <div className="mt-8">
        <div className="flex justify-between">
          <h1 className="text-cardDate text-lg font-semibold">Галт тэрэг</h1>

          <div
            className="flex items-center gap-x-2 hover:bg-blue-500 hover:text-white hover:rounded p-2 cursor-pointer"
            onClick={() => setType(0)}
          >
            <ArrowLeftIcon className="w-3 h-3" />
            <button className="text-xs font-semibold">Буцах</button>
          </div>
        </div>
        {trainData &&
          trainData?.map((item: any, index: number) => (
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
