import React, { useState } from 'react';
import s from './SelectSeats.module.scss';
import SeatMedium from '@components/bus/SelectSeats/SeatMedium';
import SeatSmall from '@components/bus/SelectSeats/SeatSmall';
import { useGlobalStore } from '@context/globalStore';
import Image from 'next/image';
import busImg from '@public/assets/busimg.jpg';

export default function SelectSeats({ datas }) {
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const { bus, driverPhone } = datas;

  const handleRemoveSeat = e => {
    const index = selectedSeats.indexOf(e.target.value);
    if (index > -1) {
      selectedSeats.splice(index, 1);
      setSelectedSeats(selectedSeats);
    }
  };

  return (
    <div className={s.root}>
      <div>
        <h1 className={s.selecetSeatTitle}>Суудал сонгох</h1>
      </div>
      <div className={s.body}>
        <div className="space-y-6">
          <h1 className={s.busInformationTitle}>Автобусын мэдээлэл</h1>
          <div className="flex space-x-4">
            <div>
              <Image src={busImg} width="180" height="180" />
            </div>
            <div className={s.busInformation}>
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
              <p className="text-cardDate font-bold border-2 bg-white h-7 w-10 rounded-md"></p>
              <h1 className="text-cardDate">Захиалах боломжтой</h1>
            </div>
            <div className="text-cardDate py-1 flex items-center space-x-5">
              <div className=" bg-bg h-7 w-10 rounded-md"></div>
              <h1 className="text-cardDate">Захиалагдсан</h1>
            </div>
          </div>
          <div className="">
            <h1 className="text-cardDate font-bold text-lg">
              Сонгогдсон суудал
            </h1>
            <div className="py-2 text-lg font-bold">
              {selectedSeats &&
                selectedSeats.map(seat => (
                  <button
                    value={seat}
                    onClick={handleRemoveSeat}
                    className={s.selectedSeats}
                  >
                    {seat}
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
  );
}
