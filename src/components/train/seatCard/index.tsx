import { useGlobalStore } from '@context/globalStore';
import { useTrainContext } from '@context/trainContext';
import { MinusIcon } from '@heroicons/react/solid';
import { Tooltip, Checkbox } from 'antd';
import React from 'react';
import style from './seatCard.module.scss';

export default function seatCard({ voyage, voyageId }) {
  const { current, setCurrent } = useGlobalStore();
  const { setSelectedSeats, selectedSeats } = useTrainContext();
  const { isSelectedSeats, setIsSelectedSeats } = useTrainContext();

  const takeTea = e => {
    selectedSeats[e.target.id - 1].isOrderedTea =
      e.target.value === false ? true : false;
    setSelectedSeats(selectedSeats);
  };

  const remove = (seat, wagonName) => {
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

  return (
    <div className="px-2 max-w-7xl mx-auto">
      <div className={style.card}>
        <div className={style.headerSection}>
          <div className="flex space-x-3">
            <img src="/assets/flagMongolia.png" className="w-10 h-5" />
            <div>
              <h1 className={style.trainName}>{voyage.TRAIN_NAME_MN}</h1>
              <h1 className={style.trainNo}>
                {voyage.TRAIN_NO}-р галт тэрэг /{voyage.TRAINTYPE_NAME}/
              </h1>
            </div>
          </div>
        </div>

        <div className={style.line} />

        <div className={style.middleSection}>
          <div className="flex justify-between">
            <div>
              <p className={style.depDate}>{voyage.DEP_DATE}</p>
              <p className={style.depTime}>
                {voyage.DEP_TIME} / {voyage.FST_NAME}
              </p>
            </div>

            <div className="md:hidden">
              <p className={style.arrDate}>{voyage.ARR_DATE}</p>
              <p className={style.depTime}>
                {voyage.TST_NAME} / {voyage.ARR_TIME}
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <p className={style.arrDate}>{voyage.ARR_DATE}</p>
            <p className={style.depTime}>
              {voyage.TST_NAME} / {voyage.ARR_TIME}
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
                    <h1 className={style.cardText}>Зорчигч - {++index}</h1>

                    <div className="flex items-center space-x-2">
                      <h1 className={style.cardText}>Цай, кофе авах</h1>
                      <Checkbox
                        onChange={takeTea}
                        id={index}
                        value={seat.isOrderedTea}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <h1 className={style.cardText}>
                      Вагон № : {seat.wagonName}
                    </h1>
                    <h1 className={style.cardText}>
                      Суудал № : {seat.seatNumber}
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
            onClick={() => setCurrent(current + 1)}
          >
            Захиалах
          </button>
        </div>
      </div>
    </div>
  );
}
