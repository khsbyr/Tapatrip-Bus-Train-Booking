import Layout from '@components/common/layout';
import Loader from '@components/train/loader';
import {
  ClassPrivateFormat,
  ClassPublicFormat,
  ClassSleepFormat,
} from '@helpers/train-array-format';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import TrainService from '@services/train';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SeatCard from '../seatCard';
import ClassPrivate from './classPrivate';
import ClassPublic from './classPublic';
import ClassSleep from './classSleep';

export default function SelectSeats() {
  const [wagonData, setWagonData] = useState([]);
  const [mestData, setMestDate] = useState([]);
  const [wagonId, setWagonId] = useState();
  const [wagonName, setWagonName] = useState('');
  const router = useRouter();
  const { voyageId, startStop, endStop, priceType } = router.query;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['train']);

  useEffect(() => {
    async function getTrainStations() {
      const token =
        AuthTokenStorageService.getAccessToken() &&
        AuthTokenStorageService.getAccessToken() != 'false'
          ? AuthTokenStorageService.getAccessToken()
          : AuthTokenStorageService.getGuestToken();
      if (token) {
        let params = {
          voyage_id: voyageId,
          start_stop: startStop,
          end_stop: endStop,
          price_type: priceType,
        };

        try {
          const res = await TrainService.getWagonData(params, token);
          if (res && res.status === 200) {
            setWagonData(res?.result);
            setWagonId(res?.result[0]?.WAGON);
            getMest(res?.result[0]);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    getTrainStations();
  }, []);

  const getMest = async wagon => {
    setLoading(true);
    setWagonName(wagon?.NAME);
    setWagonId(wagon?.WAGON);
    const token =
      AuthTokenStorageService.getAccessToken() &&
      AuthTokenStorageService.getAccessToken() != 'false'
        ? AuthTokenStorageService.getAccessToken()
        : AuthTokenStorageService.getGuestToken();
    if (token) {
      let params = {
        uid: 1,
        order_id: 0,
        wagon_id: wagon?.WAGON,
        start_stop: startStop,
        end_stop: endStop,
        mest_no: 0,
      };
      try {
        const res = await TrainService.getMestData(params, token);
        if (res && res.status === 200) {
          setMestDate(res.result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
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

      case '41':
        return (
          <ClassSleep
            data={ClassSleepFormat(mestData)}
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
              1. {t('chooseTrain')}
            </h1>

            <div className="flex items-center gap-4 cursor-pointer p-2">
              <img src="/assets/trainImages/train.svg" className="h-8" />
              <h1 className="font-semibold text-base text-trainTicket">
                {t('headTrain')}
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
                    {wagon?.NAME}-р {t('trainn')}
                  </h1>

                  <h1 className="text-sm text-trainTicket">
                    {wagon.FREEMEST !== 0
                      ? `${wagon.FREEMEST} ${t('looseSeats')}`
                      : t('full')}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <div className="w-12/12 mt-3 hidden md:block lg:hidden">
            <SeatCard
              // voyage={selectedVoyageData}
              voyageId={voyageId}
              wagonId={wagonId}
            />
          </div>
        </div>

        <div className="bg-white h-auto rounded-lg p-4 mx-2 w-12/12 md:w-6/12 lg:w-5/12">
          <h1 className="font-bold text-base text-trainTicket">
            2. {t('chooseSeat')}
          </h1>

          <div className="py-5 grid grid-cols-3">
            <div>
              <button className="py-4 px-10 rounded-lg bg-bg border-2 flex mx-auto" />
              <h1 className="text-center">{t('possible')}</h1>
            </div>
            <div>
              <button className="py-4 px-10 rounded-lg bg-white border-2 border-red-500 flex mx-auto" />
              <h1 className="text-center">{t('selected')}</h1>
            </div>
            <div>
              <button className="py-4 px-10 rounded-lg bg-bg border-2 flex mx-auto opacity-30 cursor-not-allowed" />
              <h1 className="text-center">{t('impossible')}</h1>
            </div>
          </div>

          <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 cursor-pointer ml-auto mr-0">
            {t('toilet')}
          </div>

          <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 my-3 cursor-pointer ml-auto mr-0 ">
            {t('conductor')}
          </div>

          {loading ? <Loader /> : getTrainSkech()}

          <div className="border border-gray-200 text-center w-2/3 rounded-md py-4 my-3 cursor-pointer ml-auto mr-0 ">
            {t('toilet')}
          </div>
        </div>

        <div className="w-12/12 md:hidden lg:block lg:w-4/12">
          <SeatCard
            // voyage={selectedVoyageData}
            voyageId={voyageId}
            wagonId={wagonId}
          />
        </div>
      </div>
    </Layout>
  );
}
