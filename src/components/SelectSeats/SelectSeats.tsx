import React from 'react';
import s from './SelectSeats.module.scss';
import driverimage from 'public/assets/profile2.png';
import busimg from 'public/assets/busimg.jpg';
import BusSkech from 'public/assets/BusSkech.svg';
import Image from 'next/image';
import travelData from '@data/getTravelData.json';

const SelectSeats = travelData => {
  return (
    <div className="bg-white h-auto rounded-lg shadow-lg pl-10 py-3 space-y-10">
      <div>
        <h1 className="text-cardDate font-bold text-lg"> Суудал сонгох</h1>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="space-y-10">
          <h1 className="text-cardDate font-bold text-lg">
            Автобусын мэдээлэл
          </h1>
          <div className="flex space-x-12">
            <div>
              <img src="assets/busimg.jpg" className="h-40" />
            </div>
            <div className="text-cardDate space-y-3">
              <p>ААН: Тээвэр ХХК</p>
              <p>Загвар: Hyundai Universe</p>
              <p>Улсын дугаар: 12312312</p>
              <p>Жолоочийн дугаар: 12312312</p>
            </div>
          </div>
          <div className="flex space-x-10">
            <div className="flex items-center space-x-5">
              <div className="border bg-white h-7 w-10 rounded-md"></div>
              <h1>Захиалах боломжтой</h1>
            </div>
            <div className="flex items-center space-x-5">
              <div className=" bg-bg h-7 w-10 rounded-md"></div>
              <h1>Захиалагдсан</h1>
            </div>
          </div>
          <div>
            <h1 className="text-cardDate font-bold text-md">
              Сонгогдсон суудал
            </h1>
          </div>
        </div>
        <div>
          <img src="assets/bus.svg" className="" />
        </div>
      </div>
    </div>
  );
};

export default SelectSeats;
