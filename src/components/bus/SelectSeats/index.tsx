import React, { useState } from 'react';
import style from './SelectSeats.module.scss';
import SeatMedium from '@components/bus/SelectSeats/SeatMedium';
import SeatSmall from '@components/bus/SelectSeats/SeatSmall';
import { useGlobalStore } from '@context/globalStore';
import Image from 'next/image';
import busImg from '@public/assets/busimg.jpg';
import StepCard from '../StepCard';
import { Modal } from 'antd';

export default function SelectSeats({ datas }) {
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const { isSelectedSeats, setIsSelectedSeats } = useGlobalStore();
  const { current, setCurrent } = useGlobalStore();
  const { bus, driverPhone } = datas;

  const handleRemoveSeat = e => {
    const index = selectedSeats.findIndex(
      item => item.seatNumber === e.target.value
    );
    if (index > -1) {
      selectedSeats.splice(index, 1);
      isSelectedSeats[e.target.value] = false;
      setSelectedSeats(selectedSeats);
      setIsSelectedSeats(isSelectedSeats);
    }
  };

  const next = () => {
    if (selectedSeats.length > 0) setCurrent(current + 1);
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
              <h1 className={style.busInformationTitle}>Автобусын мэдээлэл</h1>
              <div className="flex space-x-4">
                <Image src={busImg} width="160" height="160" />
                <div className={style.busInformation}>
                  <p>
                    ААН: <h1>{bus.transporter.name}</h1>
                  </p>
                  <p>
                    Загвар: <h1>{bus.modelName}</h1>
                  </p>
                  <p>
                    Улсын дугаар: <h1>{bus.plateNumber}</h1>
                  </p>
                  <p>
                    Жолоочийн дугаар: <h1>{driverPhone}</h1>
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
              <div className="">
                <h1 className="text-cardDate font-bold text-base sm:text-lg">
                  Сонгогдсон суудал
                </h1>
                <div className="py-2 text-lg font-bold">
                  {selectedSeats &&
                    selectedSeats.map(seat => (
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
            {bus.seatCount < 25 ? (
              <SeatSmall datas={datas} />
            ) : (
              <SeatMedium datas={datas} />
            )}
          </div>
        </div>
        <button className={style.buttonBlock} onClick={next}>
          Зорчигчийн мэдээлэл оруулах
        </button>
      </div>
      <div className={style.card}>
        <div className="px-2 lg:px-0 space-y-3 mt-3 md:mt-0">
          <StepCard datas={datas} />
          <button className={style.button} onClick={next}>
            Зорчигчийн мэдээлэл оруулах
          </button>
        </div>
      </div>
    </div>
  );
}
