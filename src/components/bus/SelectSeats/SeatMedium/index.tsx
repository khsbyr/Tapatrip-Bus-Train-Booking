import { useState } from 'react';
import busSketch from '@public/assets/45.svg';
import Image from 'next/image';
import seatRangeMap from '@helpers/seatRangeMap';
import { useGlobalStore } from '@context/globalStore';
import style from './SeatMedium.module.scss';
import { message } from 'antd';

const seats = [];

const SeatMedium = ({ datas }) => {
  const seatRanges = seatRangeMap(datas.seats);
  const { selectedSeats, setSelectedSeats } = useGlobalStore();

  const handleSelectSeat = e => {
    if (seats.indexOf(e.target.value) === -1) {
      seats.push(e.target.value);
      setSelectedSeats(seats);
    } else {
      message.warning('Та энэ суудлыг сонгосон байна?');
    }
  };
  return (
    <div className="border-2 flex">
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
                            : style.seatButton
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
                            : style.seatButtonMarginLeft
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
                            : style.seatButtonMarginRight
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
                            : style.seatButton
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
