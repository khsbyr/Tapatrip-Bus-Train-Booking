import React, { useState } from 'react';
import s from './SelectSeats.module.scss';
import travelData from '@data/getTravelData.json';
import Seat48_52 from '@components/bus/SelectSeats/Seat48_52';
import Seat24 from '@components/bus/SelectSeats/Seat24';
import Image from 'next/image';
import busImg from '@public/assets/busimg.jpg';
export const getStaticProps = async () => {
  const res = travelData;

  return {
    props: { travelData: res },
  };
};

export default function SelectSeats() {
  const [isClick, setIsClick] = useState(false);
  return (
    <div className={s.root}>
      <div>
        <h1 className="pl-10 text-cardDate font-bold text-lg pb-2 border-b-2">
          Суудал сонгох
        </h1>
      </div>
      <div className="flex flex-wrap">
        <div className="space-y-6">
          <h1 className="pl-10 text-cardDate font-bold text-lg">
            Автобусын мэдээлэл
          </h1>
          <div className="pl-10 flex space-x-12">
            <div>
              <Image src={busImg} width="150" height="150" />
            </div>
            <div className="text-cardDate font-medium space-y-3">
              <p>ААН: Тээвэр ХХК</p>
              <p>Загвар: Hyundai Universe</p>
              <p>Улсын дугаар: 12312312</p>
              <p>Жолоочийн дугаар: 12312312</p>
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
            <h1 className="text-cardDate font-bold text-lg">
              Сонгогдсон суудал
            </h1>
            <div className="space-x-5 px-5 text-lg font-bold">
              {isClick ? <button className={s.selectedSeats}>1</button> : <></>}
            </div>
          </div>
        </div>
        <div>
          {/* <Seat48_52 datas={travelData} /> */}
          <Seat24 datas={travelData} />
        </div>
      </div>
    </div>
  );
}
