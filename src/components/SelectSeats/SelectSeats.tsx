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
const SelectSeats = ({ travelData }) => {
  return (
    // <div>G</div>
    // <div className={s.typography}>
    <div className={s.left}>
      <div className={s.Information}>
        <div className={s.businfo}>
          <h1 className={s.bush1}>Автобусын мэдээлэл</h1>
          <div className="md:w-2/5">
            <Image
              className="object-cover rounded-lg"
              src={busimg}
              width="124"
              height="124"
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
              width="124"
              height="124"
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
            <div className="w-full sm:w-1/4">
              <h1>Суудал сонгох</h1>
            </div>
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
    /* <div className={s.right}>
        <div className={s.selectedSeats}>
          <div className={s.direct}>
            <div className={s.direction}>
              <p className="text-xs text-green-400 font-bold">ХЯМД, ХУРДАН</p>
              <p className="text-xl font-bold">
                10.19 8:25AM {<ArrowForwardIcon />} 11.30PM
              </p>
              <p className="text-xs">3цаг 20минут, 1 зогсолт</p>
            </div>
            <div className={s.direction1}>
              <p className="font-bold">Улаанбаатар -с Дархан</p>
              <p className="font-bold">Чиглэл</p>
            </div>
          </div>
          <div className={s.order}>
            <div className="flex grid grid-cols-2">
              <p className="flex justify-start">Сонгогдсон суудал</p>
              <p className="flex justify-end">1, 8</p>
            </div>
            <div className="flex grid grid-cols-2">
              <p className="flex justify-start">Тасалбар(2том хүн)</p>
              <p className="flex justify-end">15'000 ₮</p>
            </div>
            <div className="flex grid grid-cols-2 font-bold">
              <p className="flex justify-start">Нийт үнэ</p>
              <p className="flex justify-end">15'000 ₮</p>
            </div>
          </div>
          <button className={s.button}>Зорчигчийн мэдээлэл оруулах</button>
        </div>
      </div>\
    </div> */
  );
};

export default SelectSeats;
