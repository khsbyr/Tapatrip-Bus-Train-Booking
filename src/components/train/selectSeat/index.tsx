import { useGlobalStore } from '@context/globalStore';
import React, { useEffect, useState } from 'react';
import style from './selectSeats.module.scss';
import { useRouter } from 'next/router';
import TrainService from '@services/train';

export default function SelectSeats({}) {
  const { current, setCurrent } = useGlobalStore();
  const [wagonData, setWagonData] = useState([]);
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

  console.log(wagonData);

  const next = () => {
    setCurrent(current + 1);
    // else {
    //   Modal.warning({
    //     title: t('selectSeatWarning'),
    //     content: t('selectSeatWarningContent'),
    //   });
    // }
  };

  return (
    <div className={style.body}>
      <div className={style.root}>
        <h1 className="font-semibold text-base">СУУДАЛ СОНГОХ</h1>
        <div className="h-0.5 w-full bg-bg" />

        <div className="flex">
          <div className="w-2/5">
            <h1>Галт тэрэгний мэдээлэл</h1>
          </div>

          <div className="w-3/5 flex justify-around">
            <div className="space-y-2">
              <img src="/assets/trainImages/Tolgoi.png" className="" />
              {wagonData?.map(wagon => (
                <div className="flex">
                  <h1 className="">{wagon.NAME}</h1>
                  <img src="/assets/trainImages/train.png" className="" />
                </div>
              ))}
            </div>

            <div>
              <img src="/assets/trainImages/trainskech.png" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-2/5 h-48"></div>
    </div>
  );
}
