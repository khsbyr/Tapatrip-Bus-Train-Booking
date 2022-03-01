import { useGlobalStore } from '@context/globalStore';
import { useTrainContext } from '@context/trainContext';
import { MinusIcon } from '@heroicons/react/solid';
import { Checkbox, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import style from './seatCard.module.scss';
import { useRouter } from 'next/router';
import TrainService from '@services/train';
import { useTranslation } from 'next-i18next';

export default function seatCard({ voyageId, wagonId }) {
  const { current, setCurrent } = useGlobalStore();
  const { setSelectedSeats, selectedSeats } = useTrainContext();
  const { isSelectedSeats, setIsSelectedSeats } = useTrainContext();
  const router = useRouter();
  const { startStop, endStop } = router.query;
  const { orderId } = useTrainContext();
  const { t } = useTranslation(['train']);
  const [voyage, setVoyage] = useState(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVoyage(JSON.parse(localStorage.getItem('selectedVoyage')));
    }
  }, []);

  const takeTea = e => {
    selectedSeats[e.target.id - 1].isOrderedTea = e.target.value === 1 ? 0 : 1;
    setSelectedSeats(selectedSeats);
  };

  const remove = async (seat, wagonName) => {
    const index = selectedSeats.findIndex(
      item => item.seatNumber === seat && item.wagonName === wagonName
    );

    if (index > -1) {
      selectedSeats.splice(index, 1);
      isSelectedSeats[voyageId + wagonName + seat] = false;
      setSelectedSeats(selectedSeats);
      setIsSelectedSeats(isSelectedSeats);
    }
  };

  const order = () => {
    setCurrent(current + 1);
  };

  return (
    <div className="px-2 max-w-7xl mx-auto">
      <div className={style.card}>
        <div className={style.headerSection}>
          <div className="flex space-x-3">
            <img src="/assets/flagMongolia.png" className="w-10 h-5" />
            <div>
              <h1 className={style.trainName}>
                {voyage && voyage.TRAIN_NAME_MN}
              </h1>
              <h1 className={style.trainNo}>
                {voyage && voyage.TRAIN_NO}-р {t('trainn')} /
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

        {selectedSeats && selectedSeats?.length > 0 ? (
          <div className="flex items-center pt-4 sm:pt-4">
            <div className={style.rightRound}></div>
            <div className={style.border}></div>
            <div className={style.leftRound}></div>
          </div>
        ) : (
          ''
        )}

        <div className={style.footerSection}>
          {selectedSeats &&
            selectedSeats?.map((seat, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <div className={style.cardMain} key={index}>
                  <div className="flex justify-between">
                    <h1 className={style.cardText}>
                      {t('passenger')} - {++index}
                    </h1>

                    <div className="flex items-center space-x-2">
                      <h1 className={style.cardText}>{t('teaOrCoffe')}</h1>
                      <Checkbox
                        onChange={takeTea}
                        id={index}
                        value={seat.isOrderedTea}
                        defaultChecked
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <h1 className={style.cardText}>
                      {t('trainnn')} № : {seat.wagonName}
                    </h1>
                    <h1 className={style.cardText}>
                      {t('seat')} № : {seat.seatNumber}
                    </h1>
                  </div>
                </div>

                <button
                  onClick={() => remove(seat.seatNumber, seat.wagonName)}
                  className=" h-10"
                >
                  <Tooltip
                    placement="topLeft"
                    title="Устгах"
                    arrowPointAtCenter
                  >
                    <MinusIcon className="w-6 h-6 text-trainTicket cursor-pointer" />
                  </Tooltip>
                </button>
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          <button
            className={`${style.orderButton} ${
              selectedSeats && selectedSeats?.length > 0 ? 'block' : 'hidden'
            }`}
            onClick={order}
          >
            {t('order')}
          </button>
        </div>
      </div>
    </div>
  );
}
