import React, { useState } from 'react';
import style from './SelectSeats.module.scss';
import SeatLarge from '@components/bus/SelectSeats/SeatLarge';
import SeatMedium from '@components/bus/SelectSeats/SeatMedium';
import SeatSmall from '@components/bus/SelectSeats/SeatSmall';
import { useGlobalStore } from '@context/globalStore';
import StepCard from '../StepCard';
import { Modal } from 'antd';
import { arrayFilterSchedule } from '@helpers/array-format';

export default function SelectSeats({ datas, scheduleId }) {
  console.log(datas);
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const { isSelectedSeats, setIsSelectedSeats } = useGlobalStore();
  const { current, setCurrent } = useGlobalStore();
  const { bus, driverPhone } = datas;

  const formatSelectedSeats = arrayFilterSchedule(selectedSeats, scheduleId);

  const handleRemoveSeat = e => {
    const index = selectedSeats.findIndex(
      item =>
        item.seatNumber === e.target.value && item.scheduleId === scheduleId
    );
    if (index > -1) {
      selectedSeats.splice(index, 1);
      isSelectedSeats[scheduleId + e.target.value] = false;
      setSelectedSeats(selectedSeats);
      setIsSelectedSeats(isSelectedSeats);
    }
  };

  const next = () => {
    if (formatSelectedSeats.length > 0) setCurrent(current + 1);
    else {
      Modal.warning({
        title: 'Анхааруулга',
        content: 'Та зорчих суудалаа сонгоно уу?',
      });
    }
  };

  return (
    <div className={style.body}>
      <div className={style.content}>
        <div className={style.root}>
          <div>
            <h1 className={style.selecetSeatTitle}>Суудал сонгох</h1>
          </div>
          <div className={style.information}>
            <div className="sm:w-7/12 space-y-6">
              <h1 className={style.busInformationTitle}>Автобусны мэдээлэл</h1>
              <div className="flex ">
                <img src="/assets/busimg.jpg" className="pr-4 h-32" />
                <div className={style.busInformation}>
                  <p>
                    <h1>ААН: </h1>
                    {bus?.transporter?.name}
                  </p>
                  <p>
                    <h1>Даатгал: </h1>
                    {datas?.insurance?.name}
                  </p>
                  <p>
                    <h1>Загвар: </h1>
                    {bus?.modelName}
                  </p>
                  <p>
                    <h1>Улсын дугаар: </h1>
                    {bus?.plateNumber}
                  </p>
                  <p>
                    <h1>Жолоочийн дугаар: </h1>
                    {driverPhone}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex items-center py-1 space-x-5 mr-5">
                  <p className="text-cardDate font-bold border-2 border-seat bg-white h-10 w-8 rounded-md"></p>
                  <h1 className="text-cardDate">Захиалах боломжтой</h1>
                </div>
                <div className="text-cardDate py-1 flex items-center space-x-5">
                  <div className=" bg-bg border-2 border-bg h-10 w-8 rounded-md"></div>
                  <h1 className="text-cardDate">Захиалагдсан</h1>
                </div>
              </div>
              <div className="flex flex-wrap">
                <h1 className="h-full text-cardDate font-bold text-base sm:text-lg pr-4">
                  Сонгогдсон суудал
                </h1>
                <div className="py-2 text-lg font-bold">
                  {formatSelectedSeats &&
                    formatSelectedSeats.map(seat => (
                      <button
                        key={seat.seatNumber}
                        value={seat.seatNumber}
                        onClick={handleRemoveSeat}
                        className={style.selectedSeats}
                      >
                        {seat.seatNumber}
                      </button>
                    ))}
                </div>
              </div>
            </div>
            {bus?.seatCount < 25 ? (
              <SeatSmall datas={datas} scheduleId={scheduleId} />
            ) : bus?.seatCount < 46 ? (
              <SeatMedium datas={datas} scheduleId={scheduleId} />
            ) : (
              <SeatLarge datas={datas} scheduleId={scheduleId} />
            )}
          </div>
        </div>
        <button className={style.buttonBlock} onClick={next}>
          Захиалах
        </button>
      </div>
      <div className={style.card}>
        <div className="px-2 lg:px-0 space-y-3 mt-3 md:mt-0">
          <StepCard datas={datas} scheduleId={scheduleId} />
          <button className={style.button} onClick={next}>
            Захиалах
          </button>
        </div>
      </div>
    </div>
  );
}
