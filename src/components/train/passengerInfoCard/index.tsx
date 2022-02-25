import { useGlobalStore } from '@context/globalStore';
import { useTrainContext } from '@context/trainContext';
import { MinusIcon } from '@heroicons/react/solid';
import { Tooltip, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import style from './passengerInfoCard.module.scss';

export default function PassengerInfoCard() {
  const [voyage, setVoyage] = useState(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVoyage(JSON.parse(localStorage.getItem('selectedVoyage')));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className={style.card}>
        <div className={style.headerSection}>
          <div className="flex space-x-3">
            <img src="/assets/flagMongolia.png" className="w-10 h-5" />
            <div>
              <h1 className={style.trainName}>
                {voyage && voyage.TRAIN_NAME_MN}
              </h1>
              <h1 className={style.trainNo}>
                {voyage && voyage.TRAIN_NO}-р галт тэрэг /
                {voyage && voyage.TRAINTYPE_NAME}/
              </h1>
            </div>
          </div>
        </div>

        <div className={style.line} />

        <div className={style.middleSection}>
          <div className="flex justify-between">
            <div>
              <p className={style.depDate}>{voyage && voyage.DEP_DATE}</p>
              <p className={style.depTime}>
                {voyage && voyage.DEP_TIME} / {voyage && voyage.FST_NAME}
              </p>
            </div>

            <div className="md:hidden">
              <p className={style.arrDate}>{voyage && voyage.ARR_DATE}</p>
              <p className={style.depTime}>
                {voyage && voyage.TST_NAME} / {voyage && voyage.ARR_TIME}
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <p className={style.arrDate}>{voyage && voyage.ARR_DATE}</p>
            <p className={style.depTime}>
              {voyage && voyage.TST_NAME} / {voyage && voyage.ARR_TIME}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
