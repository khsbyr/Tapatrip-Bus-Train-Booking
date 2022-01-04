import { useGlobalStore } from '@context/globalStore';
import React, { useEffect, useState } from 'react';
import style from './selectSeats.module.scss';
import { useRouter } from 'next/router';
import TrainService from '@services/train';
import ClassPublic from './classPublic';
import { ClassPublicFormat } from '@helpers/train-array-format';

export default function SelectSeats({}) {
  const { current, setCurrent } = useGlobalStore();
  const [wagonData, setWagonData] = useState([]);
  const [mestData, setMestDate] = useState([]);
  const [wagonId, setWagonId] = useState();
  const [wagonName, setWagonName] = useState('');
  const router = useRouter();
  const { voyageId, startStop, endStop, priceType } = router.query;

  useEffect(() => {
    async function getTrainStations() {
      let params = {
        voyage_id: voyageId,
        start_stop: startStop,
        end_stop: endStop,
        price_type: priceType,
      };

      try {
        const res = await TrainService.getWagonData(params);
        if (res && res.status === 200) {
          setWagonData(res.result);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getTrainStations();
  }, []);

  const getMest = async wagon => {
    setWagonName(wagon.NAME);
    setWagonId(wagon.WAGON);
    let params = {
      uid: 1,
      order_id: 0,
      wagon_id: wagon.WAGON,
      start_stop: startStop,
      end_stop: endStop,
      mest_no: 0,
    };
    try {
      const res = await TrainService.getMestData(params);
      if (res && res.status === 200) {
        setMestDate(res.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-5 flex gap-2">
      <div className="bg-white h-auto w-3/12 rounded-lg p-4 space-y-3">
        <h1 className="font-bold text-base text-trainTicket">
          1. Вагон сонгох
        </h1>

        <div className="flex items-center gap-4 cursor-pointer p-2">
          <img src="/assets/trainImages/train.svg" className="h-8" />
          <h1 className="font-semibold text-base text-trainTicket">
            Толгой вагон
          </h1>
        </div>

        {wagonData?.map(wagon => (
          <div
            className={`flex items-center gap-4 p-2 rounded-lg   
            ${
              wagon.FREEMEST !== 0
                ? 'cursor-pointer hover:opacity-80'
                : 'cursor-not-allowed opacity-30'
            }
              ${
                wagon.WAGON === wagonId
                  ? 'bg-white border-red-500 border-2'
                  : 'bg-bg border'
              }
            `}
            key={wagon.WAGON}
            onClick={() => getMest(wagon)}
          >
            <img
              src={`${
                wagon.WAGON === wagonId
                  ? '/assets/trainImages/wagonRed.svg'
                  : '/assets/trainImages/wagon.svg'
              }
              `}
              className="h-14"
            />

            <div>
              <h1
                className={`font-semibold text-base ${
                  wagon.WAGON === wagonId ? 'text-red-500' : 'text-trainTicket'
                }`}
              >
                {wagon.NAME}-р вагон
              </h1>

              <h1 className="text-sm text-trainTicket">
                {wagon.FREEMEST !== 0
                  ? `${wagon.FREEMEST} сул суудал`
                  : 'Дүүрсэн'}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white h-auto w-5/12 rounded-lg p-4">
        <h1 className="font-bold text-base text-trainTicket">
          2. Суудал сонгох
        </h1>

        <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 cursor-pointer ml-auto mr-0">
          Бие засах өрөө
        </div>

        <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 my-3 cursor-pointer ml-auto mr-0 ">
          Кондукторын өрөө
        </div>

        {priceType === '5' ? (
          <ClassPublic
            data={ClassPublicFormat(mestData)}
            voyageId={voyageId}
            wagonName={wagonName}
          />
        ) : (
          ''
        )}

        <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 my-3 cursor-pointer ml-auto mr-0 ">
          Бие засах өрөө
        </div>
      </div>

      <div className="bg-white h-32 w-4/12 rounded-lg"></div>
    </div>
  );
}
