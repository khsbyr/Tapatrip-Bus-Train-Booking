import React, { useState } from 'react';
import s from './SelectSeats.module.scss';
import travelData from '@data/getTravelData.json';
import SeatMedium from '@components/bus/SelectSeats/SeatMedium';
import SeatSmall from '@components/bus/SelectSeats/SeatSmall';

export default function SelectSeats({ datas }) {
  console.log(datas);
  const [isClick, setIsClick] = useState(false);
  const { bus, driverPhone } = datas;
  return (
    <div className={s.root}>
      <div>
        <h1 className="pl-10 text-cardDate font-bold text-lg pb-2 border-b-2">
          Суудал сонгох
        </h1>
      </div>
      <div className="flex">
        <div className="space-y-6">
          <h1 className="pl-10 text-cardDate font-bold text-lg">
            Автобусын мэдээлэл
          </h1>
          <div className="pl-10 flex space-x-4">
            <div>
              <img src="../../assets/busimg.jpg" className="h-40" />
            </div>
            <div className="text-cardDate font-medium space-y-3">
              <p>ААН: {bus.transporter.name}</p>
              <p>Загвар: {bus.modelName}</p>
              <p>Улсын дугаар: {bus.plateNumber}</p>
              <p>Жолоочийн дугаар: {driverPhone}</p>
            </div>
          </div>
          <div className="pl-10 flex space-x-10">
            <div className="flex items-center space-x-5">
              <p className="text-cardDate font-bold border-2 bg-white h-7 w-10 rounded-md"></p>
              <h1 className="text-cardDate">Захиалах боломжтой</h1>
            </div>
            <div className="text-cardDate flex items-center space-x-5">
              <div className=" bg-bg h-7 w-10 rounded-md"></div>
              <h1 className="text-cardDate">Захиалагдсан</h1>
            </div>
          </div>
          <div className="pl-10 flex flex-wrap">
            <h1 className="text-cardDate font-bold text-md">
              Сонгогдсон суудал
            </h1>
            <div className="space-x-5 px-5 text-lg font-bold">
              {isClick ? <button className={s.selectedSeats}>1</button> : <></>}
            </div>
          </div>
        </div>
        <div>
          {bus.seatCount < 25 ? (
            <SeatSmall datas={datas} />
          ) : (
            <SeatMedium datas={datas} />
          )}
        </div>
      </div>
    </div>
  );
}
