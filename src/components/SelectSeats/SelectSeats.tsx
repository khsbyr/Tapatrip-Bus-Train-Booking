import React from 'react';
import s from './SelectSeats.module.scss';
import driverimage from 'public/assets/profile2.png';
import busimg from 'public/assets/busimg.jpg';
import BusSkech from 'public/assets/BusSkech.svg';
import Image from 'next/image';
import travelData from '@data/getTravelData.json';
interface Props {
  travelData?: string;
}
const businfo = travelData.bus;
const driverInfo = travelData.driver;
const SelectSeats = travelData => {
  return (
    <div className={s.left}>
      <div className={s.Information}>
        <div className={s.businfo}>
          <h1 className={s.bush1}>Автобусын мэдээлэл</h1>
          <div className="md:w-2/5">
            <Image
              className="object-cover rounded-lg"
              src={busimg}
              width="100"
              height="100"
            />
          </div>
          <div className="space-y-1 pl-2 md:w-3/5">
            <p>ААН: {businfo.company_name}</p>
            <p>Загвар: {businfo.model_name}</p>
            <p>Улсын дугаар: {businfo.plate_number}</p>
          </div>
        </div>
        <div className={s.driverinfo}>
          <h1 className={s.bush1}>Жолоочийн мэдээлэл</h1>
          <div className="md:w-2/5">
            <Image
              className="object-cover rounded-lg"
              src={driverimage}
              width="100"
              height="100"
            />
          </div>
          <div className="space-y-1 pl-2 md:w-3/5">
            <p>Нэр: Жолооч</p>
            <p>Дугаар: {driverInfo.phone}</p>
          </div>
        </div>
      </div>
      <div className={s.selectSeats}>
        <div className="divide-y">
          <div className={s.seatsh1}>
            <h1 className="text-blue-900 sm:w-1/4">Суудал сонгох</h1>
            <div className={s.zahialga}>
              <p className="pr-4 pb-2">
                <label className={s.yeszahialga}></label>
                Захиалах боломжтой
              </p>
              <p>
                <label className={s.nozahialga}></label>
                Захиалагдсан
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Image src={BusSkech} alt="Bus" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeats;
