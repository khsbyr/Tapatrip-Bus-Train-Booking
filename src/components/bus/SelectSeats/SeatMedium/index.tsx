import { useState } from 'react';
import busSketch from '@public/assets/45.svg';
import Image from 'next/image';
import seatRangeMap from '@helpers/seatRangeMap';
import { useGlobalStore } from '@context/globalStore';
import style from './SeatMedium.module.scss';
import { message } from 'antd';
import { arrayFilterSeat } from '@helpers/array-format';

const seats = [];
const isSelected = [];

const SeatMedium = ({ datas }) => {
  const seatRanges = seatRangeMap(datas.seats);
  const { selectedSeats, setSelectedSeats } = useGlobalStore();
  const { isSelectedSeats, setIsSelectedSeats } = useGlobalStore();

  const handleSelectSeat = e => {
    let isArray = arrayFilterSeat(seats,e.target.value);
    if (isArray.length === 0) {
      let passenger= {
          id:'',
          firstName:'dsadsad',
          lastName:'sadsad',
          documentNumber:'',
          gender:'',
          isChild:'',
          genderName: '',
          seatNumber: e.target.value 
      }
      seats.push(passenger);
      isSelected[e.target.value]=true;
      setSelectedSeats(seats);
      setIsSelectedSeats(isSelected);
    } else {
      message.warning('Та энэ суудлыг сонгосон байна?');
    }
  };
  return (
    <div className="flex">
      <div className="z-0 relative w-full">
        <Image src={busSketch} className="z-0" />
      </div>
      <div className="absolute mt-40 ml-7">
        <table>
          {seatRanges.map((seat, i) =>
            seat.length === 4 ? (
              <tr key={i}>
                {seat.map((seat, j) =>
                  j !== 2 ? (
                    <td key={j}>
                      <button
                        key={seat.number}
                        className={
                          seat.isAvialable
                            ? style.seatButtonDisabled
                            : (isSelectedSeats[seat.number]) ? style.seatButtonSelected : style.seatButton
                        }
                        value={seat.number}
                        onClick={handleSelectSeat}
                        disabled={seat.isAvialable}
                      >
                        {seat && seat.number}
                      </button>
                    </td>
                  ) : (
                    <td key={j}>
                      <button
                        key={seat.number}
                        className={
                          seat.isAvialable
                            ? style.seatButtonMarginLeftDisabled
                            : (isSelectedSeats[seat.number]) ? style.seatButtonMarginLeftSelected : style.seatButtonMarginLeft
                        }
                        value={seat.number}
                        onClick={handleSelectSeat}
                        disabled={seat.isAvialable}
                      >
                        {seat && seat.number}
                      </button>
                    </td>
                  )
                )}
              </tr>
            ) : (
              <tr key={i}>
                {seat.map((seat, k) =>
                  k == 3 || k == 4 ? (
                    <td key={k}>
                      <button
                        key={seat.number}
                        className={
                          seat.isAvialable
                            ? style.seatButtonMarginRightDisabled
                            : (isSelectedSeats[seat.number]) ? style.seatButtonMarginRightSelected : style.seatButtonMarginRight
                        }
                        value={seat.number}
                        onClick={handleSelectSeat}
                        disabled={seat.isAvialable}
                      >
                        {seat && seat.number}
                      </button>
                    </td>
                  ) : (
                    <td key={k}>
                      <button
                        key={seat.number}
                        className={
                          seat.isAvialable
                            ? style.seatButtonDisabled
                            : (isSelectedSeats[seat.number]) ? style.seatButtonSelected : style.seatButton
                        }
                        value={seat.number}
                        onClick={handleSelectSeat}
                        disabled={seat.isAvialable}
                      >
                        {seat && seat.number}
                      </button>
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </table>
      </div>
    </div>
  );
};
export default SeatMedium;
