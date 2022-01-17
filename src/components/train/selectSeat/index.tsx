import { useTrainContext } from '@context/trainContext';
import {
  ClassPrivateFormat,
  ClassPublicFormat,
} from '@helpers/train-array-format';
import TrainService from '@services/train';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SeatCard from '../seatCard';
import ClassPrivate from './classPrivate';
import ClassPublic from './classPublic';
import Loader from '@components/common/loader';
import { useGlobalStore } from '@context/globalStore';
import Layout from '@components/common/layout';

export default function SelectSeats() {
  const { current, setCurrent } = useGlobalStore();
  const [wagonData, setWagonData] = useState([]);
  const [mestData, setMestDate] = useState([]);
  const [wagonId, setWagonId] = useState();
  const [wagonName, setWagonName] = useState('');
  const router = useRouter();
  const { voyageId, startStop, endStop, priceType } = router.query;
  const { selectedVoyageData } = useTrainContext();
  const [loading, setLoading] = useState(false);

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
          setWagonId(res.result[0]?.WAGON);
          getMest(res.result[0]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getTrainStations();
  }, []);

  const getMest = async wagon => {
    setLoading(true);
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
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getTrainSkech = () => {
    switch (priceType) {
      case '5':
        return (
          <ClassPublic
            data={ClassPublicFormat(mestData)}
            voyageId={voyageId}
            wagonName={wagonName}
            startStop={startStop}
            endStop={endStop}
            wagonId={wagonId}
          />
        );

      case '8':
        return (
          <ClassPrivate
            data={ClassPrivateFormat(mestData)}
            voyageId={voyageId}
            wagonName={wagonName}
            startStop={startStop}
            endStop={endStop}
            wagonId={wagonId}
          />
        );

      default:
        '';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-5 space-y-3 md:space-y-0 md:flex">
        <div className=" w-12/12 md:w-6/12 lg:w-3/12">
          <div className="bg-white rounded-lg p-4 space-y-3 flex-none mx-2">
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
                  : 'bg-bg border-2'
              }
            `}
                key={wagon.WAGON}
                onClick={() => (wagon.FREEMEST !== 0 ? getMest(wagon) : '')}
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
                      wagon.WAGON === wagonId
                        ? 'text-red-500'
                        : 'text-trainTicket'
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
          <div className="w-12/12 mt-3 hidden md:block lg:hidden">
            <SeatCard voyage={selectedVoyageData} voyageId={voyageId} />
          </div>
        </div>

        <div className="bg-white h-auto rounded-lg p-4 mx-2 w-12/12 md:w-6/12 lg:w-5/12">
          <h1 className="font-bold text-base text-trainTicket">
            2. Суудал сонгох
          </h1>

          <div className="py-5 grid grid-cols-3">
            <div>
              <button className="py-4 px-10 rounded-lg bg-bg border-2 flex mx-auto" />
              <h1 className="text-center">Сонгох боломжтой</h1>
            </div>
            <div>
              <button className="py-4 px-10 rounded-lg bg-white border-2 border-red-500 flex mx-auto" />
              <h1 className="text-center">Сонгосон суудал</h1>
            </div>
            <div>
              <button className="py-4 px-10 rounded-lg bg-bg border-2 flex mx-auto opacity-30 cursor-not-allowed" />
              <h1 className="text-center">Зарагдсан суудал</h1>
            </div>
          </div>

          <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 cursor-pointer ml-auto mr-0">
            Бие засах өрөө
          </div>

          <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 my-3 cursor-pointer ml-auto mr-0 ">
            Кондукторын өрөө
          </div>

          {loading ? <Loader /> : getTrainSkech()}

          <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 my-3 cursor-pointer ml-auto mr-0 ">
            Бие засах өрөө
          </div>
        </div>

        <div className="w-12/12 md:hidden lg:block lg:w-4/12">
          <SeatCard voyage={selectedVoyageData} voyageId={voyageId} />
        </div>
      </div>
    </Layout>
  );
}
